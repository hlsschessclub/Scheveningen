function generateScheveningenPairings(teamA, teamB) {
    const rounds = [];
    const totalRounds = teamA.length;
  
    for (let round = 0; round < totalRounds; round++) {
      const roundPairings = [];
      for (let i = 0; i < teamA.length; i++) {
        const playerA = teamA[i];
        const playerB = teamB[(i + round) % teamA.length];
        roundPairings.push([playerA, playerB]);
      }
      rounds.push(roundPairings);
    }
    return rounds;
}
  
const teamA = [1, 2, 3, 4, 5];
const teamB = [6, 7, 8, 9, 10];

const pairings = generateScheveningenPairings(teamA, teamB);

pairings.forEach((round, roundNumber) => {
    console.log(`Round ${roundNumber + 1}:`);
    round.forEach((pairing, index) => {
        const [playerA, playerB] = pairing;
        console.log(`Game ${index + 1}: Player ${playerA} (Team A) vs. Player ${playerB} (Team B)`);
    });
});