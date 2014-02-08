var house = {
    
    kitchen:{
        name: "Kitchen",
        description: "Your kitchen is untidy and cramped",
        visits: 0,
        on_enter: function() {
            if(house.kitchen.visits === 0) {
                alert("This is your first time in the kitchen!");
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
                return("This is your first time in the garage!");
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
                alert("This is your first time in the bedroom!");
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