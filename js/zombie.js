//create the four groups of zombies
var zombies = ["west", "south", "north", "east"];
    zombies = $.shuffle(zombies);

//initialize the initial threat
var available_threat = 100;

//loop through four groups and assign threat level
for(var i=0; i < zombies.length; i++){
    var threat = Math.ceil(Math.random() * available_threat);
    
    //console.log("Hoarde: " + zombies[i] + " threatening " + threat);
    
    zombies[i][threat];
    
    available_threat = available_threat - threat;
}

function attack(){
    alert("ZOMBIES ATTACKED AND YOURE DEAD");
}


