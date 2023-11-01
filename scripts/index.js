// Create some test data and push
let players = [
    {
        "name":"Siddh",
        "age":"17",
        "school":"HLSS",
    },

    {
        "name":"Brian",
        "age":"17",
        "school":"LMASS",
    }
]

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
req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("PUT", "https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("$2a$10$SCXldiQdzrsVLdCXWgOLi.qgj8X5Zh34LJ67hDPYms1oy7KQQKJEK","$2a$10$oGTcITKnBmM9y.nMnfL8o.XjXWbVByJSRoi8qk1v2BqjIm78YvL12");
req.send(JSON.stringify(players));

// Collect all player data and store in an object (players)
// Send all of the data out to the bin when the page is continued