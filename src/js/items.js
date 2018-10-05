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
        description: "There is an old bread<em>knife<em> hidden under some rubble.",
		hint: "This knife looks dull alone, but it could be deadly if taped to something else.",
        score: 7,
		discovered: 0
    },
    "wine bottle": {
        description: "A <em>wine bottle</em> rolls around on the floor.",
        hint: "This bottle of wine is half-empty and would be deadly if shattered.",
		score: 3,
		discovered: 0
    },
    "grill fork":{
        description: "A rusty, bent <em>grill fork<em> stands erect, jammed in a crack in the counter.",
		hint: "The grill fork is slightly bent, but could be used as a handle for another item...or on a handle.",
        score: 7,
		discovered: 0
    },
    "broom":{
        description: "A plastic <em>broom</em> with a long handle rests curiously in the middle of the floor.",
		hint: "IT IS A BROOM",
        score: 4,
		discovered: 0
    },
    "frying pan":{
        description: "A cast-iron <em>frying pan</em> sits atop the broken oven.",
		hint:"Particle man, particle man...",
        score:3,
		discovered: 0
    },
    "nails":{
        description:"A handful of sharp <em>nails</em> is scattered on the floor.",
		hint:"Don't step on these.",
        score:1,
		discovered: 0
    },
    "baseball bat":{
        description:"A wooden <em>baseball bat</em> lies behind a broken table.",
        hint:"It's a glorified cudgel, you barbarian.",
		score:3,
		discovered: 0
    },
    "chainsaw": {
        description: "A very rusty <em>chainsaw</em> sits on the floor.",
        hint: "This looks like it needs gasoline to run.",
        score: 12,
		discovered: 0
    },
    "hedge clippers": {
        description: "A pair of <em>hedge clippers</em> leans up against the wall.",
		hint:"A rusty pair of hedge clippers. Wouldn't it be insane to throw these?",
        score: 5,
		discovered: 0
    },
    "fireworks": {
        description: "A box of old <em>fireworks</em> gathers dust in the corner.",
		hint:"A box of highly-explosive fireworks. Not sure how these got left behind.",
        score: 9,
		discovered: 0
    },
    "box fan":{
        description: "A burnt-out <em>box fan</em> with three metal blades leans casually against one window.",
        score:2,
		discovered: 0
    },
    "television":{
        description: "A huge box <em>television</em> from the late 90's sits overturned with a broken screen.",
        score: 1,
		discovered: 0
    },
    "marbles": {
        description: "A single sack of <em>marbles</em> lies in an open drawer.",
        score: 3,
		discovered: 0
    },
    "pocket knife": {
        description: "A small <em>pocket knife<em> sits on the floor.",
        score: 3,
		discovered: 0
    },
    "gym socks": {
        description: "A pair of <em>gym socks<em> is thrown in front of the door.",
        score: 1,
		discovered: 0
       },
    "pipe": {
        description: "An old metal <em>pipe</em> sticks slightly out of the wall.",
        score: 10,
		discovered: 0
    },
    "toilet seat": {
        description: "A random <em>toilet seat</em> lies on the floor.",
        score: 3,
		discovered: 0
    },
    "curling iron": {
        description: "A <em>curling iron</em> is plugged into the wall.",
        score: 2,
		discovered: 0
    },
    "plunger": {
        description: "A <em>plunger</em> is stuck to the wall. Who knows how long the suction will last.",
        score: 0,
		discovered: 0
    },
    "shower rod": {
        description: "A bent metal <em>shower rod</em> approximately four feet in length.",
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
