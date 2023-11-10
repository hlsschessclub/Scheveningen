// Read
// let req = new XMLHttpRequest();
// let local; 

// req.onreadystatechange = () => {
// 	if (req.readyState == XMLHttpRequest.DONE) {
// 		try {
// 			const local = JSON.parse(req.responseText);
// 			console.log(local.record.sample);
// 		  } catch (error) {
// 			console.error("Error parsing JSON: " + error.message);
// 		  }
// 	}
//   };
  
// req.open("GET", "https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest", true);
// req.setRequestHeader("$2a$10$SCXldiQdzrsVLdCXWgOLi.qgj8X5Zh34LJ67hDPYms1oy7KQQKJEK","$2a$10$SKgcIhXvDZGsQ13exoTxoejD30QpZ57P4YLDu0Q6MWyJXVY9kFCsq");
// req.send();

// Write
// req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//   if (req.readyState == XMLHttpRequest.DONE) {
//     console.log(req.responseText);
//   }
// };

// req.open("PUT", "https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/", true);
// req.setRequestHeader("Content-Type", "application/json");
// req.setRequestHeader("$2a$10$SCXldiQdzrsVLdCXWgOLi.qgj8X5Zh34LJ67hDPYms1oy7KQQKJEK","$2a$10$oGTcITKnBmM9y.nMnfL8o.XjXWbVByJSRoi8qk1v2BqjIm78YvL12");
// req.send(JSON.stringify(players));

// Collect all player data and store in an object (players)
// Send all of the data out to the bin when the page is continued

// fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// (async () => {
//   const res = await fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest');

//   if(!res.ok) {
//     throw new Error(`'Request failed with status code: ${res.status}`);
//   }

//   const data = await res.json();

//   console.log(data);
// })();

// function generateScheveningenPairings(teamA, teamB) {
//   const schedule = [];
//   const totalRounds = teamA.length;

//   for (let round = 0; round < totalRounds; round++) {
//     const roundGames = [];

//     for (let i = 0; i < teamA.length; i++) {
//       const playerA = teamA[i];
//       const playerB = teamB[(i + round) % teamA.length]; // Rotate teamB players in each round
//       const colors = round % 2 === 0 ? ['White', 'Black'] : ['Black', 'White'];

//       roundGames.push({
//         white: { id: playerA },
//         black: { id: playerB },
//         result: -1, // You can update this with actual game results
//       });
//     }

//     schedule.push({
//       round: round + 1,
//       games: roundGames,
//     });
//   }

//   return schedule;
// }

// // Example usage:
// const teamA = [1, 2, 3, 4, 5];
// const teamB = [6, 7, 8, 9, 10];

// const schedule = generateScheveningenPairings(teamA, teamB);

// console.log(JSON.stringify({ schedule }, null, 2));


