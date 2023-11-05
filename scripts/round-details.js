// Fetch all information from JSONBIN
async function fetchData() {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest');
    if (!res.ok) {
      throw new Error(`Request failed with status code: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// fetchData();

// Set header of page to round number
const pageHeader = document.querySelector('#round-details-title');
pageHeader.textContent = `Round ${data["match-information"]["current-round"]}`;

// Set column titles to team names
const columnTeam1 = document.querySelector('#team-name-1');
const columnTeam2 = document.querySelector('#team-name-2');

columnTeam1.textContent = data["match-information"]["team1-name"];
columnTeam2.textContent = data["match-information"]["team2-name"];

// Access current round matchups and sort players on each board based on standings
// Set the score to " - "
// Create buttons for each player so user can click on each

// Add functionality for selecting winners/losers/draws


// Push data to JSONBin and move to the next round
