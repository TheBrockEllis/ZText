var allItems = [
	"wine bottle",
	"knife",
	"grill fork",
	"frying pan",
	"broom",
	"chainsaw",
	"fireworks",
	"hedge clippers",
	"baseball bat",
	"nails",
	"gym socks",
	"marbles",
	"pocket knife",
	"television",
	"box fan",
	"toilet seat",
	"plunger",
	"curling iron",
	"shower rod",
	"pipe"
];

var items = {
    "knife": {
        description: "There is an old breadknife hidden under some rubble.",
		hint: "This knife looks dull alone, but it could be deadly if taped to something else.",
        score: 7,
		discovered: 0
    },
    "wine bottle": {
        description: "A bottle of wine rolls around on the floor.",
        hint: "This bottle of wine is half-empty and would be deadly if shattered.",
		score: 3,
		discovered: 0
    },
    "grill fork":{
        description: "A rusty, bent grill fork stands erect, jammed in a crack in the counter.",
		hint: "The grill fork is slightly bent, but could be used as a handle for another item...or on a handle.",
        score: 2,
		discovered: 0
    },
    "broom":{
        description: "A plastic broom with a long handle rests curiously in the middle of the floor.",
		hint: "IT IS A BROOM",
        score: 0,
		discovered: 0
    },
    "frying pan":{
        description: "A cast-iron frying pan sits atop the broken oven.",
		hint:"Particle man, particle man...",
        score:3,
		discovered: 0
    },
    "nails":{
        description:"A handful of sharp nails is scattered on the floor.",
		hint:"Don't step on these.",
        score:1,
		discovered: 0
    },
    "baseball bat":{
        description:"A wooden baseball bat lies behind a broken table.",
        hint:"It's a glorified cudgel, you barbarian.",
		score:3,
		discovered: 0
    },
    "chainsaw": {
        description: "A very rusty chainsaw sits on the floor.",
        hint: "This looks like it needs gasoline to run.",
        score: 12,
		discovered: 0
    },
    "hedge clippers": {
        description: "A pair of hedge clippers leans up against the wall.",
		hint:"A rusty pair of hedge clippers. Wouldn't it be insane to throw these?",
        score: 5,
		discovered: 0
    },
    "fireworks": {
        description: "A box of old fireworks gathers dust in the corner.",
		hint:"A box of highly-explosive fireworks. Not sure how these got left behind.",
        score: 9,
		discovered: 0
    },
    "box fan":{
        description: "A burnt-out box fan with three metal blades leans casually against one window.",
        score:2,
		discovered: 0
    },
    "television":{
        description: "A huge box television from the late 90's sits overturned with a broken screen.",
        score: 1,
		discovered: 0
    },
    "marbles": {
        description: "A single sack of marbles lies in an open drawer.",
        score: 3,
		discovered: 0
    },
    "pocket knife": {
        description: "A small pocket knife sits on the floor.",
        score: 3,
		discovered: 0
    },
    "gym socks": {
        description: "A pair of gym socks is thrown in front of the door.",
        score: 1,
		discovered: 0
       },
    "pipe": {
        description: "An old metal pipe sticks slightly out of the wall.",
        score: 10,
		discovered: 0
    },
    "toilet seat": {
        description: "A random toilet seat lies on the floor.",
        score: 3,
		discovered: 0
    },
    "curling iron": {
        description: "A curling iron is plugged into the wall.",
        score: 2,
		discovered: 0
    },
    "plunger": {
        description: "A plunger is stuck to the wall. Who knows how long the suction will last.",
        score: 0,
		discovered: 0
    },
    "shower rod": {
        description: "A bent metal shower rod approximately four feet in length.",
        score: 3,
		discovered: 0
    },

    // combos
    "pipebomb": {
        description: "Gun powder lit in a confined space could cause quite a bit of damage.",
        score: 25,
		discovered: 0
    },
}

//we need to work on these combos...
var combos = {
    "fireworks+pipe" : {
        name: "pipebomb"
    }
}
