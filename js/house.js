var house = {
    
    kitchen:{
        name: "Kitchen",
        description: "Your kitchen is untidy and cramped",
        visits: 0,
        on_enter: function() {
            if(!house.kitchen.visits++) {
                return("The kitchen is completely ransacked. The stench of rotten food is overwhelming. You see some wine bottles on the floor, some broken and some still intact. There is a large knife stuck in the kitchen table.");
            };
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
        description: "Filled with old basketballs and oil cans",
        visits: 0,
        on_enter: function() {
            if(!house.garage.visits++) {
                return("You enter the house through the garage door, which is barely still on its hinges. There are some old hedge clippers hanging on the wall, some old fireworks in a box and a rusty chainsaw sitting on the floor. You can see the light of the kitchen through the partially opened door...");
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
        visits: 0,
        on_enter: function() {
            if(!house.bedroom.visits++) {
                return("There is a bed in the corner of the room. It was probably white once and maybe even pretty. There's a sack of <em>marbles</em> laying under the broken drawer. You can see the tip of a <em>pocket knife</em> poking out of a pair of pants on the floor. ");
            };
        },
        nextTo: ["kitchen", "bathroom"],
        defense: {
            name: "window",
            item: ""
        },
        items: ["gym sock", "marbles", "pocket knife"]
    },
    
    bathroom:{
        name: "Bathroom",
        description: "The medicine cabinet has been torn off the shelves and some of the drawers are still open",
        visits: 0,
        on_enter: function() {
            if(!house.bathroom.visits++) {
                alert("This is your first time in the bedroom!");
            };
        },
        nextTo: ["kitchen", "bedroom"],
        defense: {
            name: "skylight",
            item: ""
        },
        items: ["toilet seat", "plunger", "curling iron"]
    }

};