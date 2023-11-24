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

    // Round Number Subheading
    const roundHeader = document.querySelector("#round-header");
    roundHeader.textContent = `After Round ${data["match-information"]["current-round"]}`;

    // Create table with the data, sorting by total score
    function updateTableData() {
        const rounds = data["match-information"]["team1-players"];
        let totalPlayers = data["match-information"]["total-players"];

        // Create a temporary data object where player id is the key for each player
        let dataMap = new Map();

        // Initialize tempData with player name and team
        for (let i = 0; i < totalPlayers; ++i) {
            const player = data.players[i];
            const fullName = player["first-name"] + ' ' + player["last-name"];
            const team = player.team === 1 ? data["match-information"]["team1-name"] : data["match-information"]["team2-name"];
            let curPlayerData = Array(rounds+3);
            curPlayerData[0] = fullName;
            curPlayerData[1] = team;
            curPlayerData[rounds+2] = 0; // A final column which is max score of the player.
            dataMap.set(data.players[i].id, curPlayerData);
        }

        // Fill in tempData according to round results
        // Simultaneously accumulate total team scores
        let team1Total = 0;
        let team2Total = 0;
        for (const round of data.schedule) {
            for (const game of round.games) {
                const playerA = dataMap.get(game.playerA.id);
                const playerB = dataMap.get(game.playerB.id);
                // Brian: not sure how the "result" variable maps. 
                // Brian: I'll assume -1 = tbd, 0 = playerA wins, 1 = player B wins, and 2 = draw
                if (game.result === 0) {
                    playerA[round.round+1] = '1';
                    playerB[round.round+1] = '0';
                    playerA[rounds+2] += 1;
                    if (playerA[1] === data['match-information']['team1-name']) {
                        team1Total += 1;
                    } else if (playerA[1] === data['match-information']['team2-name']) {
                        team2Total += 1;
                    }
                } else if (game.result == 1) {
                    playerA[round.round+1] = '0';
                    playerB[round.round+1] = '1';
                    playerB[rounds+2] += 1;
                    if (playerB[1] === data['match-information']['team1-name']) {
                        team1Total += 1;
                    } else if (playerB[1] === data['match-information']['team2-name']) {
                        team2Total += 1;
                    }
                } else if (game.result == 2) {
                    playerA[round.round+1] = '1/2';
                    playerB[round.round+1] = '1/2';
                    playerA[rounds+2] += 0.5;
                    playerB[rounds+2] += 0.5;
                    team1Total += 0.5;
                    team2Total += 0.5;
                }
            }
        }

        // Update team total scores
        data['match-information']['team1-score'] = team1Total;
        data['match-information']['team2-score'] = team2Total;
        
        // Sort map by score, descending.
        const sortedArray = Array.from(dataMap);
        sortedArray.sort((a, b) => b[1][rounds+2] - a[1][rounds+2]);
        // Pop total score.
        for (const item of sortedArray) {
            item[1].pop();
        }

        // Fill in html table with data
        const dataTable = document.querySelector('#current-data-table');
        for (const playerSet of sortedArray) {
            const row = document.createElement('tr');
            const playerData = playerSet[1];
            for (const playerDataPoint of playerData) {
                const cell = document.createElement('td');
                cell.textContent = playerDataPoint;
                row.appendChild(cell);
            }
            dataTable.appendChild(row);
        }

        // Update Team Scores
        const teamName1 = document.querySelector("#team-name-1");
        const teamScores = document.querySelector("#team-scores");
        const teamName2 = document.querySelector("#team-name-2");
        teamName1.textContent = data["match-information"]["team1-name"]
        teamScores.textContent = `${data["match-information"]["team1-score"]} - ${data["match-information"]["team2-score"]}`
        teamName2.textContent = data["match-information"]["team2-name"]
    }
    updateTableData();


    // Timer functionality (not final)
    let timerInterval;
    let timerRunning = false;
    let minutes = 10;
    let seconds = 0;

    const timerDisplay = document.querySelector('#timer');
    const timerButton = document.querySelector('#timer-button')

    timerButton.addEventListener("click", toggleTimer);

    function updateTimerDisplay() {
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function toggleTimer() {
        if (timerRunning) {
            clearInterval(timerInterval);
            timerRunning = false;
        } else {
            timerRunning = true;
            timerInterval = setInterval(function () {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timerInterval);
                        timerRunning = false;
                    } 
                    else {
                        minutes--;
                        seconds = 59;
                    }
                } 
                else {
                    seconds--;
                }
                updateTimerDisplay();
            }, 1000);
        }
    }
    updateTimerDisplay(); // Set display
    toggleTimer(); // Start timer on page load


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
        // increment round number
        data['match-information']['current-round'] += 1;

        // Wait for matchmaking and data to send to JSONbin
        await(sendData(data));
        window.location.href = "round-details.html"; // Direct to next page
    }
    catch (error) {
        console.error("Error:", error);
    }  
    });
}

main()