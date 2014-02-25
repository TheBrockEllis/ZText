var house = {
    
    kitchen:{
        name: "Kitchen",
        description: "The smell of rotten milk and eggs is overwhelming.",
        exit: 0,
        direction: "south",
        visits: 0,
        on_enter: function() {
            if(!house.kitchen.visits++) {
                return("The kitchen is completely ransacked. The stench of rotten food is overwhelming. The door to the garage is wide open. So can see a ray of light from the bathrooms skylight and the bedroom is cracked at the end of the hallway.");
            }else{
                return false;
            }
        },
        nextTo: ["garage", "bathroom", "bedroom"],
        defense: {
            name: "sliding door",
            item: ""
        },
        items: ["wine bottle", "knife"]
    },
    
    garage:{
        name: "Garage",
        description: "The garage is dimly lit and smells of oil and saw dust.",
        exit: 0,
        direction: "north",
        visits: 0,
        on_enter: function() {
            if(!house.garage.visits++) {
                return("You enter the house through the garage door, which is barely still on its hinges. You can see the light of the kitchen through the partially opened door...");
            }else{
                return false;
            }
        },
        nextTo: ["kitchen"],
        defense: {
            name: "garage door",
            item: ""
        },
        items: ["chainsaw", "fireworks", "hedge clippers"]
    },
    
    bedroom:{
        name: "Bedroom",
        description: "The bed is thrown across the room and the vanity mirror reflects light on the ceiling",
        exit: 0,
        direction: "west",
        visits: 0,
        on_enter: function() {
            if(!house.bedroom.visits++) {
                return("There is a bed in the corner of the room. It was probably white once and maybe even pretty.");
            }else{
                return false;
            }
        },
        nextTo: ["kitchen", "bathroom"],
        defense: {
            name: "window",
            item: ""
        },
        items: ["gym socks", "marbles", "pocket knife"]
    },
    
    bathroom:{
        name: "Bathroom",
        description: "The medicine cabinet has been torn off the shelves and some of the drawers are still open",
        exit: 0,
        direction: "east",
        visits: 0,
        on_enter: function() {
            if(!house.bathroom.visits++) {
                return("The bathroom is small and cramped. The toilet backed up sometime ago and left behind a foul stence. A dim ray of sunlight is shining through the skylight in the ceiling.");
            }else{
                return false;
            }
        },
        nextTo: ["kitchen", "bedroom"],
        defense: {
            name: "skylight",
            item: ""
        },
        items: ["toilet seat", "plunger", "curling iron"]
    }

};