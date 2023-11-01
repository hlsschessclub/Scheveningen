const team1btn = document.querySelector('#team-name-button-1');
const team1tag = document.querySelector('#team-name-1');
const team2btn = document.querySelector('#team-name-button-2');
const team2tag = document.querySelector('#team-name-2');

team1btn.addEventListener('click', () => {
  team1tag.textContent = "123"
  
});

team2btn.addEventListener('click', () => {
  team2tag.textContent = "456"
  
});

const addteam1 = document.querySelector('#add-1');
addteam1.addEventListener('click', () => {
  // prompt user to add name, student num, grade
  // create a new button with insivible-button class and unique player id
  // set the textcontent to the student's name
});


// Create some test data and push
let players = [
    {
        "id": 1, 
        "name":"Siddh",
        "age":"17",
        "school":"HLSS",
    },
    {
        "id": 2, 
        "name":"Brian",
        "age":"17",
        "school":"LMASS",
    }
]