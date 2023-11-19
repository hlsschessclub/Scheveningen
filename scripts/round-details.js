// Fetch all information from JSONBIN
async function fetchData() {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest');
    if (!res.ok) {
      throw new Error(`Request failed with status code: ${res.status}`);
    }
    const data = await res.json();
    return data.record;
  } catch (error) {
    console.error(error);
  }
}


async function main() {
    // Temporary json to reduce JSONbin requests here
    // let data = {
    //     "match-information": {
    //         "total-players": 4,
    //         "team1-players": 2,
    //         "team2-players": 2,
    //         "team1-name": "HLSS",
    //         "team2-name": "LMASS",
    //         "team1-score": 10,
    //         "team2-score": 8,
    //         "current-round": 1
    //     },
    //     "players": [
    //         {
    //         "id": 1,
    //         "team": 1,
    //         "first-name": "Lebron",
    //         "last-name": "James",
    //         "grade": "23"
    //         },
    //         {
    //         "id": 2,
    //         "team": 2,
    //         "first-name": "Stephen",
    //         "last-name": "Curry",
    //         "grade": "30"
    //         },
    //         {
    //         "id": 3,
    //         "team": 1,
    //         "first-name": "Kevin",
    //         "last-name": "Durant",
    //         "grade": "35"
    //         },
    //         {
    //         "id": 4,
    //         "team": 2,
    //         "first-name": "Kobe",
    //         "last-name": "Bryant",
    //         "grade": "24"
    //         }
    //     ],
    //     "schedule": [
    //         {
    //         "round": 1,
    //         "games": [
    //             {
    //             "playerA": {
    //                 "id": 1,
    //                 "color": "White"
    //             },
    //             "playerB": {
    //                 "id": 2,
    //                 "color": "Black"
    //             },
    //             "result": 1
    //             },
    //             {
    //             "playerA": {
    //                 "id": 3,
    //                 "color": "White"
    //             },
    //             "playerB": {
    //                 "id": 4,
    //                 "color": "Black"
    //             },
    //             "result": 0
    //             }
    //         ]
    //         },
    //         {
    //         "round": 2,
    //         "games": [
    //             {
    //             "playerA": {
    //                 "id": 1,
    //                 "color": "Black"
    //             },
    //             "playerB": {
    //                 "id": 4,
    //                 "color": "White"
    //             },
    //             "result": 1
    //             },
    //             {
    //             "playerA": {
    //                 "id": 3,
    //                 "color": "Black"
    //             },
    //             "playerB": {
    //                 "id": 2,
    //                 "color": "White"
    //             },
    //             "result": 1
    //             }
    //         ]
    //         }
    //     ]
    // };

    const data = await fetchData();
    console.log(data);

    // Set header of page to round number
    const pageHeader = document.querySelector('#round-details-title');
    pageHeader.textContent = `Round ${data["match-information"]["current-round"]}`;

    // Set column titles to team names
    const columnTeam1 = document.querySelector('#team-name-1');
    const columnTeam2 = document.querySelector('#team-name-2');

    columnTeam1.textContent = data["match-information"]["team1-name"];
    columnTeam2.textContent = data["match-information"]["team2-name"];

    // Get player name from ID
    function getNameFromId(id) {
        return(`${data.players[id-1]["first-name"]} ${data.players[id-1]["last-name"]}`);
    }

    // Create table 
    table = document.querySelector('#round-table');

    // Get current round information
    currentRound = (data.schedule[data["match-information"]["current-round"]-1]);

    // Information for game at board x
    console.log(currentRound.games[0]);
    let games = data["match-information"]["team1-players"]; 

    for (let board = 1; board <= games; board++) {
        var playerA = currentRound.games[board-1].playerA;
        var playerB = currentRound.games[board-1].playerB;

        // Create new row for each board
        var row = table.insertRow(-1);

        // Create 4 cells for each row
        var boardCell = row.insertCell(0);
        var playerACell = row.insertCell(1);
        var resultCell = row.insertCell(2);
        var playerBCell = row.insertCell(3);

        // Set board cell number
        boardCell.innerHTML = board;

        // Create button for the results
        var resultButton = document.createElement("button");
        resultButton.className = "invisible-button";
        resultButton.onclick = function(){setResult(board)};
        resultButton.innerHTML = "-";
        resultCell.appendChild(resultButton); // Append button to cell

        // Ids for each element
        resultButton.id = `board${board}-result`;
        playerACell.id = `player-a-board${board}`;
        playerBCell.id = `player-b-board${board}`;

        // Set text for player cells
        playerACell.innerHTML = `${getNameFromId(playerA.id)} (${playerA.color})`;
        playerBCell.innerHTML = `${getNameFromId(playerB.id)} (${playerB.color})`;
    }

    // THERE IS PROBABLY A SIGNIFICANTLY BETTER WAY OF DOING THIS USING CSS CLASSES AND AN ARRAY OF STATES
    function setResult(board) {
        var playerACell = document.getElementById(`player-a-board${board}`);
        var playerBCell = document.getElementById(`player-b-board${board}`);
        var resultButton = document.getElementById(`board${board}-result`)
        var currentText = resultButton.innerHTML.trim();
        let currentBoard = data.schedule[data['match-information']['current-round'] - 1].games[board-1];

        // Cycle through the different states
        if (currentText === "-") {
            resultButton.innerHTML = "1-0";
            playerACell.style.backgroundColor = "green";
            playerBCell.style.backgroundColor = "red";
            currentBoard.result = 0;
        } else if (currentText === "1-0") {
            resultButton.innerHTML = "0-1";
            playerACell.style.backgroundColor = "red";
            playerBCell.style.backgroundColor = "green";
            currentBoard.result = 1;
        } else if (currentText === "0-1") {
            resultButton.innerHTML = "1/2-1/2";
            playerACell.style.backgroundColor = "grey";
            playerBCell.style.backgroundColor = "grey";
            currentBoard.result = 2;
        } else {
            resultButton.innerHTML = "-";
            playerACell.style.backgroundColor = "white";
            playerBCell.style.backgroundColor = "white";
            currentBoard.result = -1;
        }
        // Update JSON object
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
        await(sendData(data));
        window.location.href = "current-standings.html"; // Direct to next page
    }
    catch (error) {
        console.error("Error:", error);
    }  
    });

}

main()