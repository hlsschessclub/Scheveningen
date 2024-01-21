// JSON Template
let data = {
  "match-information": {
    "total-players": 0,
    "team1-players": 0,
    "team2-players": 0, 
    "team1-name": "Team 1",
    "team2-name": "Team 2",
    "team1-score": 0,
    "team2-score": 0,
    "current-round": 1, 
  },
  "players": [
    // {
    //   "id": players + 1,
    //   "team": 1 or 2,
    //   "first-name": fname,
    //   "last-name": lname,
    //   "grade": grade
    // }
  ],
  "schedule": [
    // {
    //   "round": number,
    //   "games": [
    //     {
    //       "playerA": {
    //         "id": id,
    //         "color": "White"
    //       },
    //       "playerB": {
    //         "id": id,
    //         "color": "Black"
    //       },
    //       "result": -1
    //     },
    //   ]
    // }
  ]
};

// ---------- CHANGING TEAM NAMES ----------
// Buttons for changing team names
const changeNameTeam1 = document.querySelector('#team-name-button-1');
const changeNameTeam2 = document.querySelector('#team-name-button-2');

// Team name headers
const headerTeam1 = document.querySelector('#team-name-1');
const headerTeam2 = document.querySelector('#team-name-2');

// Event listeners for team name buttons
changeNameTeam1.addEventListener('click', () => {openTeamNameModal(1)});
changeNameTeam2.addEventListener('click', () => {openTeamNameModal(2)});

// Function for changing team names
function openTeamNameModal(team) {
  // Make entire modal visible
  var modal = document.getElementById('team-name-modal');
  modal.style.display = 'block';
  
  // Change title of modal depending on which team name is being modified
  var modalTitle = document.getElementById('team-name-modal-title')
  modalTitle.textContent = "Enter Name of Team " + team;

  // Access the current team name and set the box to that
  document.getElementById('team-name-input').value = data["match-information"][`team${team}-name`];
  
  // Set the submit button to change the respective teams information
  var modalButton = document.getElementById('team-modal-submit-button')
  modalButton.onclick = function() {updateTeamName(team)};

  // Close modal if user clicks off
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal('team-name-modal');
    }
  }
}

function updateTeamName(team) {
  // Change the header and update the json
  if (team == 1) {
    var teamName = document.getElementById('team-name-input').value;
    headerTeam1.textContent = teamName
    data["match-information"]["team1-name"] = teamName;
  }
  else {
    var teamName = document.getElementById('team-name-input').value;
    headerTeam2.textContent = teamName
    data["match-information"]["team2-name"] = teamName;
  }
  // Close the modal after the change has been made
  closeModal('team-name-modal');
}

// ---------- ADDING PLAYERS TO EACH TEAM ----------
// Buttons for adding players to each team
const addPlayerTeam1 = document.querySelector('#add-team-1');
const addPlayerTeam2 = document.querySelector('#add-team-2');

// Event listeners for team name buttons
addPlayerTeam1.addEventListener('click', () => {openAddPlayerModal(1)});
addPlayerTeam2.addEventListener('click', () => {openAddPlayerModal(2)});

function openAddPlayerModal(team) {
  // Make entire modal visible
  var modal = document.getElementById('player-information-modal');
  modal.style.display = 'block';

  // Set all boxes to blank
  document.getElementById('first-name-input').value = "";
  document.getElementById('last-name-input').value = "";
  document.getElementById('grade-input').value = "";

  // Set the submit button to add the player to the correct team
  var modalButton = document.getElementById('player-modal-submit-button')
  modalButton.onclick = function() {addPlayer(team)};

  // Close modal if user clicks off
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal('player-information-modal');
    }
  }
}

function addPlayer(team) {
  // Get player information from the modal
  var fName = document.getElementById('first-name-input').value;
  var lName = document.getElementById('last-name-input').value;
  var grade = document.getElementById('grade-input').value;
  var id = data["match-information"]["total-players"] + 1;
  // Update the JSON
  let newPlayer = {
    "id": id,
    "team": team,
    "first-name": fName,
    "last-name": lName,
    "grade": grade
  };
  data.players.push(newPlayer);
  
  // Update the total-players count in match-information
  data["match-information"]["total-players"] = data.players.length;
  data["match-information"][`team${team}-players`]++;

  // Create a new button to submit
  var newButton = document.createElement("button");
  newButton.textContent = `${fName} ${lName}`;
  newButton.id = id
  newButton.className = "invisible-button";
  newButton.onclick = function(){openUpdatePLayerModal(id)};
  
  // Append button to respective team div
  var teamDiv = document.getElementById(`team-list-${team}`); // Replace "team${team}-div" with your actual div ID
  teamDiv.appendChild(newButton);
  
  // Close modal
  closeModal('player-information-modal');
}

function openUpdatePLayerModal(id){
  var player = data.players[id-1];
  var modal = document.getElementById('player-information-update-modal');
  modal.style.display = 'block';

  // Change title of modal depending on which player is being selected
  var modalTitle = document.getElementById('player-information-update-modal-title')
  modalTitle.textContent = `Update Information for ${player["first-name"]} ${player["last-name"]}`;

  // Access the current player data and set the input boxes to that text
  document.getElementById('first-name-update-input').value = player["first-name"];
  document.getElementById('last-name-update-input').value = player["last-name"];
  document.getElementById('grade-update-input').value = player["grade"];
  
  //Set the submit button to update the player on the team
  var modalButton = document.getElementById('player-modal-update-submit-button')
  modalButton.onclick = function() {updatePlayer(player)};

  var deletePlayerButton = document.getElementById('player-modal-update-delete-button');
  deletePlayerButton.onclick = function() {deletePlayer(player["id"]-1)}; //sends the index of the player in the JSON  

  // Close modal if user clicks off
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal('player-information-update-modal');
    }
  }
}

function updatePlayer(player) {
  var fName = document.getElementById('first-name-update-input').value;
  var lName = document.getElementById('last-name-update-input').value;
  var grade = document.getElementById('grade-update-input').value;

  // Set new values
  player["first-name"] = fName;
  player["last-name"] = lName;
  player["grade"] = grade;

  // Update the button on screen
  var button = document.getElementById(player["id"]);
  button.textContent = `${fName} ${lName}`;

  closeModal('player-information-update-modal');
}

function deletePlayer(id) {
  // Updates total player counts
  data["match-information"]["total-players"]--;
  data["match-information"][`team${data.players[id]["team"]}-players`]--;

  // Remove button
  var button = document.getElementById(data.players[id]["id"]);
  button.remove();

  // Deletes player from the json
  delete data.players[id];
  data.match; 

  closeModal("player-information-update-modal");
}

function closeModal (id) {
  var modal = document.getElementById(id);
  modal.style.display = 'none';
}

// ---------- MATCHMAKING ----------
// Compute matchmaking and append to json data
async function matchMaking(){
  // Sorts players into into their teams
  const teamA = [];
  const teamB = [];
  for(let i = 0; i < data.players.length; i++){
    let player = data.players[i];
    if (player["team"]==1){
      teamA.push(player["id"]);
    }
    else{
      teamB.push(player["id"]);
    }
  }

  function generateSchedule(teamA, teamB) {
    const schedule = [];
    const totalRounds = teamA.length;
  
    // Iterate through rounds
    for (let round = 0; round < totalRounds; round++) {
      const roundGames = [];
  
      // Iteratre through teams and assign matchups
      for (let i = 0; i < teamA.length; i++) {
        const playerA = teamA[i];
        const playerB = teamB[(i + round) % teamA.length];
        const colors = round % 2 === 0 ? ['White', 'Black'] : ['Black', 'White'];
        
        // Push individual game to round
        roundGames.push({
          playerA: { id: playerA, color: colors[0] },
          playerB: { id: playerB, color: colors[1] },
          result: -1, // Placeholder for result
        });
      }
  
      // Push round and games to schedule
      schedule.push({
        round: round + 1,
        games: roundGames,
      });
    }
  
    // Return the completed schedule
    return schedule;
  }

  // Call function and modify the JSON
  data.schedule = generateSchedule(teamA, teamB);
}

// ---------- SEND DATA ----------
// Function to send data to the JSONbin
async function sendData(packet) {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(packet)
    });
    if (!res.ok) {
      throw new Error(`Request failed with status code: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return(data);
  } catch (error) {
    console.error(error);
    throw(error);
  }
}

// Continue button
const continueButton = document.querySelector('#continue-button');
continueButton.addEventListener('click', async () => {
  try {
    // Wait for matchmaking and data to send to JSONbin
    await matchMaking();
    await(sendData(data));
    window.location.href = "/round-details"; // Direct to next page
  }
  catch (error) {
    console.error("Error:", error);
  }  
});

