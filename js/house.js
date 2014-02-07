var house = {
    
    kitchen:{
        name: "Kitchen",
        description: "Your kitchen is untidy and cramped",
        visits: 0,
        on_enter: function() {
            if(!locations.kitchen.visits++) {
                alert("This is your first time in the kitchen!");
            };
        },
        defense: {
            name: "sliding door",
            object: ""
        },
        objects: {
            "knife": {
                description: "An old bread knife, probably seen better days",
                type: "attack",
                score: 7
            },
            "wine bottle": {
                description: "A 1988 Pino Grigio. A fine year for wine.",
                type: "attack",
                score: 3
            }
        }
    },
    
    garage:{
        name: "Garage",
        description: "Filled with old basketballs and oil cans",
        visits: 0,
        on_enter: function() {
            if(!locations.kitchen.visits++) {
                alert("This is your first time in the garage!");
            };
        },
        defense: {
            name: "garage door",
            object: ""
        },
        objects: {
            "chainsaw": {
                description: "A very rusty chainsaw. Has just a little gas left...",
                type: "attack",
                score: 12
            },
            "hedge clippers": {
                description: "Used to prune bushes, and zombies.",
                type: "attack",
                score: 5
            }
        }
    },
    
    bedroom:{
        name: "Bedroom",
        description: "The bed is thrown across the room and the vanity mirror reflects light on the ceiling",
        visits: 0,
        on_enter: function() {
            if(!locations.kitchen.visits++) {
                alert("This is your first time in the bedroom!");
            };
        },
        defense: {
            name: "window",
            object: ""
        },
        objects: {
            "marbles": {
                description: "A sack of marbles that an old man would love to play",
                type: "both",
                score: 3
            },
            "pocket knife": {
                description: "Original swiss army ",
                type: "attack",
                score: 3
            },
            "gym socks": {
                description: "Old and smelly",
                type: "both",
                score: 1
            }
        }
    }

};