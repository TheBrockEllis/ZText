//create the four groups of zombies
var zombies = [
        {
            "direction": "west",
            "threat": 0
        },
        {
            "direction": "south",
            "threat": 0
        },
        {
            "direction": "north",
            "threat": 0
        },
        {
            "direction": "east",
            "threat": 0
        }
        ]
        
    zombies = $.shuffle(zombies);

//initialize the initial threat
var available_threat = 100;

//loop through four groups and assign threat level
for(var i=0; i < zombies.length; i++){
    //get random number from what is available
    var threat = Math.ceil(Math.random() * available_threat);
        
    //set that hoardes threat level
    zombies[i].threat = threat;
    
    //update the available threat (it all adds up to 100)
    available_threat = available_threat - threat;
}

var zombie_strength = {
    "low": "A few solitary zombies lumber forward in the distance.",
    "med": "A sizable group of zombies is visable just over the horizon. They are walking this way.",
    "high": "A horde of zombies is heading right for you. You can hear their moans in the distance."
}

//get random number between 0 and 3
var exit = Math.floor(Math.random() * 4); 

//get the keys of the house object (the names of the rooms)
var keys = Object.keys(house);

//get the name of the room the exit is going to be
var exit_room = keys[exit];

//set the exit 
house[exit_room].exit = 1;



