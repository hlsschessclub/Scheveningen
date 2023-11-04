// Fetch all information from JSONBIN

(async () => {
    const res = await fetch('https://api.jsonbin.io/v3/b/6542b49d12a5d376599392e1/latest');
    if(!res.ok) {
      throw new Error(`'Request failed with status code: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  })();

// The information that needs to be accessed is the player info,
// Should the matchups be compiled prior to the round start?




// calculate the round and place players in specific slots
// add functionality for selecting winners
