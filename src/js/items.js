var items = {
    ////Kitchen
    "knife": {
        description: "There is an old breadknife hidden under some rubble.",
        score: 7
    },
    "wine bottle": {
        description: "A bottle or two of wine roll around the floor.",
        score: 3
    },
    
    "grill fork":{
        description: "A rusty, bent grill fork stands erect, jammed in a crack in the counter.",
        score: 2
    }
    
    "broom":{
        description: "A plastic broom with a long handle rests curiously in the middle of the floor.",
        score: 0
    }
    
    "frying pan":{
        description: "A cast-iron frying pan sits atop the broken oven",
        score:3
    }
    
    
    ////Garage
    "nails":{
        description:"A handful of sharp nails scattered on the floor.",
        score:1
    },
    "baseball bat":{
        description:"A wooden bat lies behind a broken table",
        score:3
    },
    
    "chainsaw": {
        description: "A very rusty chainsaw sits on the floor.",
        hint: "This looks like it needs gasoline to run.",
        score: 12
    },
    "hedge clippers": {
        description: "A pair of hedge clippers leans up against the wall.",
        score: 5
    },
    "fireworks": {
        description: "A box of old fireworks gathers dust in the corner.",
        score: 9
    },
    ////Bedroom
    "box fan":{
        description: "a burnt-out box fan with three metal blades leans casually against one window",
        score:2
    },
    "television":{
        description: "A huge box TV from the late 90's sits overturned with a broken screen",
        score: 1
    }
    "marbles": {
        description: "A single sack of marbles lies in an open drawer.",
        score: 3
    },
    "pocket knife": {
        description: "A small pocket knife sits on the floor.",
        score: 3
    },
    "gym socks": {
        description: "A pair of gym socks is thrown in front of the door.",
        score: 1
       },
   ///Bathroom
    "pipe": {
        description: "An old metal pipe sticks slightly out of the wall.",
        score: 10
    },
    "toilet seat": {
        description: "A random toilet seat lies on the floor.",
        score: 3
    },
    "curling iron": {
        description: "A curling iron is plugged into the wall.",
        score: 2
    },
    "plunger": {
        description: "A plunger is stuck to the wall. Who knows how long the suction will last.",
        score: 
    }
    "shower rod": {
        description: "A bent metal shower rod approximately four feet in length.",
        score: 3
    }


}

//we need to work on these combos...
var combos = {
    "fireworks+pipe" : {
        name: "pipebomb",
        description: "Gun powder lit in a confined space could cause quite a bit of damage.",
        score: 25
    }
}