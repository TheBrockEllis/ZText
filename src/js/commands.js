var commands = [
    "grab", 
    "move", 
    "set", 
    "use", 
    "combine", 
    "look", 
    "examine", 
    "prepare",
    "help"
];

$("#commands").keypress(function(e) {
	if(e.which == 13) {
		var elm = $(this);
		var command = elm.val();
		var command_array = command.toLowerCase().split(" ");

		if($.inArray(command_array[0], commands) !== -1 ) {
			switch (command_array[0]) {
				case "grab":
					grab(command_array);
				break;
				case "move":
					move(command_array);
				break;
				case "set":
					set(command_array);
				break;
				case "use":
				    use(command_array);
				break;
				case "combine":
					combine(command_array);
			    break;
				case "look":
					look(command_array);
			    break;
				case "examine":
			        examine(command_array);
				break;
				case "prepare":
					prepare(command_array);
		        break;
                case "help":
                    help(command_array);
                break;
			}

		} else {
            result("You're so scared, you aren't giving valid commands!");
		}
		elm.val("");
	}
});

function wait(ms) {
    var start = +(new Date());
    while (new Date() - start < ms);
}

function result(text){
	var elm = $('#output');
	elm.children("p").removeClass("active");
	elm.append("<p class='active'>"+text+"</p>");
	elm.scrollTop(elm.prop("scrollHeight"));
}

function attack_result(text){
	var elm = $('#output');
	elm.children("p").removeClass("active");
    var html = "<p class='active' style='display:none;'>"+text+"</p>";
	$(html).hide().appendTo(elm).fadeIn(2000);
	elm.scrollTop(elm.prop("scrollHeight"));
}

function updateLocation(location){
	survivor.location = location;
	var on_enter = house[survivor.location].on_enter();
	if (on_enter) {
		result(on_enter);
	}
	//var enter = house[survivor.location].on_enter;
	//console.log(enter);
	$("#location span").html(survivor.location);
}

function updateInventory(item){
	if ( $.inArray(item, survivor.inventory) !== -1){
		//the item is already in your inventory and needs to be removed

		//find the index of the item in your inventory
		var inventory_index = survivor.inventory.indexOf(item);

		//cut that item out of that array
		survivor.inventory.splice(inventory_index, 1);
	}else{
		//the item is not in your inventory and needs to be added

		//do you already have two items?
		if (survivor.inventory.length >= 2) {
			result("You are already carrying as much as you can handle!");
			return;
		}

		survivor.inventory.push(item);
	}

	//loop through all items in inventory and place them on index page
	var li = "";
	$.each(survivor.inventory, function(index, value){
		li += "<li>"+value+"</li>";
	});

	$("#inventory ul").empty().append(li);

	return true;

}

function clearCommands(){
	$("#commands").val("");
}

function grab(command){
	//what item are you grabbing?
	var item = command[1];

	//does the item have more than one word?
	if(command[2]) {
		item +=  " " + command[2];
	}

	//is the item you want to grab in the room you're in
	if ( $.inArray(item, house[survivor.location].items) !== -1 ){
		//YES! The item is there

		//find the index of the item in the room
		var room_index = house[survivor.location].items.indexOf(item);
		house[survivor.location].items.splice(room_index, 1);

		//mark that item as discovered
		items[item].discovered = 1;

		//add item to your inventory
		if( updateInventory(item) ) result("You add " + item + " to your inventory.");
	}else if(item === house[survivor.location].defense.item){
		//the item was in the defensive position

		//add defensive item to your inventory
		updateInventory(item);

		//remove it from the defensive position
		house[survivor.location].defense.item = "";

		result("You remove the " + item + " from the " + house[survivor.location].defense.name + ".");
	}else{
		result("That item isn't in this room!");
	}
}//end grab

function set(command){
	//what item are you trying to set down
	var item = command[1];

	//does the item have more than one word?
	if(command[2]) {
		item +=  " " + command[2];
	}

	//do you have that item in your inventory
	if ( $.inArray(item, survivor.inventory) !== -1 ) {
		//yes you do!

		if (house[survivor.location].defense.item !== "") {
			result("The " + house[survivor.location].defense.item + " is already next to the " + house[survivor.location].defense.name + "!");
			return;
		}

		//remove item from inventory
		updateInventory(item);

		//add that item to the defensive position
		house[survivor.location].defense.item = item;

		result("You place " +item+" next to the " + house[survivor.location].defense.name +".");
	}else{
		result("You do not have that item in your inventory!");
	}
}//end set


function use(command){
	//what item are you trying to use
	var item = command[1]

	//does the item have more than one word?
	if(command[2]) {
		item +=  " " + command[2];
	}

	//do you have that item in your inventory
	if ( $.inArray(item, survivor.inventory) !== -1 ) {

		//yes you do!
		if (survivor.hand.length >= 2) {
			result("You already have too many items.");
			return;
		}else{
			//remove item from inventory
			updateInventory(item);

			//add that item to the hand
			survivor.hand.push(item);

			result("You wield " + item + ".");
		}

		//survivor.hand,item = item; console.log("loil2")
		/*if (survivor.hand !== 2) {
			survivor[survivor.hand]= item;
		}*/
	}else{
		result("You dont have that item in your inventory!");
	}
}
//end use

function combine(command) {
	var item;
	var item2;
	switch (command.length) {
		// "combine item and item"
		case 4:
			item = command[1];
			item2 = command[3];
			break;
		// "combine item and another item" or "combine this item and item"
		case 5:
			if (command[2] == "and") {
				item = command[1];
				item2 = command[3] + " " + command[4];
			} else if (command[3] == "and") {
				item = command[1] + " " + command [2];
				item2 = command[4];
			}
			break;
		// "combine this item and another item"
		case 6:
			item = command[1] + " " + command[2];
			item2 = command[4] + " " + command[5];
			break;
	}
	var combo = item + "+" + item2;
	var combo2 = item2 + "+" + item;
	if (combos[combo]) {
		updateInventory(item);
		updateInventory(item2);
		updateInventory(combos[combo].name);
		result("You create a " + combos[combo].name + ".");
	} else if (combos[combo2]) {
		updateInventory(item);
		updateInventory(item2);
		updateInventory(combos[combo2].name);
		result("You create a " + combos[combo2].name + ".");
	} else {
		result("Not a valid combination.");
	}
}

function move(command){
	//where are you trying to go
	var destination = command[2];

	//can you move there
	if ( $.inArray(destination, house[survivor.location].nextTo) !== -1 ){
		//yes you can move
		result("You move to the " + destination + ".");
		updateLocation(destination);
	}else{
		result("You cannot move to that room directly from the room you're in.");
	}
}//end move

function prepare(command){
	//where are you trying to go
	var item = command[1];

    //does the item have more than one word?
	if(command[2]) {
		item +=  " " + command[2];
	}

    //do you have this item
	if ( $.inArray(item, survivor.inventory) !== -1 ){
		//yes you can prepare that item

        updateInventory(item);

        house[survivor.location].items.push(item);
        items[item].discovered = 1;
		result("You set up the " + item + " so that it's easy to use when the attack comes.");
	}else{
		result("You fumble around and cannot find the " +item+ ".");
	}
}//end prepare

function look(command){
	//do we have a description for the room you're in?
	if(house[survivor.location].description) {
		//yes we do have a description!
		var room_desc = house[survivor.location].description;

		//get the items currently in the room
		var items_desc = "";
		var items_array = house[survivor.location].items;
		//console.log("Items Array: " + items_array);
		for(var i=0; i < items_array.length; i++){
			//get the items description
			var tmp_item = items_array[i];

			items_desc += " " + items[tmp_item].description;
		}

        var exit_desc = "";
        //give a hint as to whether or not this is a good exit or not
        if(house[survivor.location].exit === 1) {
            exit_desc = "This would be a great location to try and esacpe if things get out of hand."
        }

        //give a description of the strength of zombies coming at that room
		var direction = house[survivor.location].direction;

		var hoarde = zombies.filter(function (obj) {
		  return obj.direction === direction;
		})[0];

		var threat = hoarde.threat;
		if (threat <= 12) {
			hoarde_desc = zombie_strength.low;
		}else if (threat >= 13 && threat <= 25) {
			hoarde_desc = zombie_strength.med;
		}else if (threat > 26) {
			hoarde_desc = zombie_strength.high;
		}

		result(room_desc + " " + items_desc + " " + exit_desc + " " + hoarde_desc);
	}else{
		result("You're eyes well up with tears as you realize you're about to die...");
	}
} //end look

function examine(command) {
	var item = command[1];

	if(command[2]) {
		item +=  " " + command[2];
	}

    if ( $.inArray(item, house[survivor.location].items) !== -1 ){

	   // var items_array = house[survivor.location].items
		var item_examine = items[item].hint;

		console.log(item_examine);

		result(item_examine);
    } else {
        result("Item isn't here!");
	}
}

function help() {
  var text = "Grab __: Places an item in the room into your inventory<br>" +
             "Move to __: Used to move to an adjoining room<br>" +
             "Set __: Sets an item in a defensive position in the room you're in<br>" +
             "Use __: Wields an item in one of your two hands<br>" +
             "Combine __ and __ : Combines two items to create a powerful new item<br>" +
             "Look : Looks around the room and gives a description<br>" +
             "Examine __ : Gives a detailed description of an item<br>";
  result(text);
}

///////////////////////////////////////////////////////////////////////////////
///   BEGIN THE ATTACK!!
///////////////////////////////////////////////////////////////////////////////
function attack(){
	$("#commands").prop("disabled", "disabled");

	//REMOVE LATERS - use for debugging
	//var exit_room = "garage";

	if(survivor.location === exit_room){
		//you are in the exit room!
		if( skirmish(exit_room) ){
            victory();
		}else{
            defeat();
		}
	}else if (  $.inArray(exit_room, house[survivor.location].nextTo !== -1) ) {
		//you're in the room that is next to the exit!
		if( skirmish(survivor.location) ) {
            if( skirmish(exit_room) ) victory();
            else defeat();
        }else{
            defeat();
        }
    }else{
        if( skirmish(survivor.location) ) {
            if( skirmish("kitchen") ){
                if( skirmish(exit_room) ) victory();
                else defeat();
            }else{
                defeat();
            }
        }else{
            defeat();
        }
	}
} //end attack()

//deal with battles
//pass it a room and it will calculate whether the survivor lives or dies
//will return false on death, true on survival
function skirmish(room) {
	var direction = house[room].direction,
        hoarde = zombies.filter(function (obj) {
            return obj.direction === direction;
        })[0];

	console.log("Initial Zombie Threat: " + hoarde.threat);
	attack_result("You hear the zombies directly outside the window. They're coming for you.");

	var defensive_item = house[room].defense.item;
	if(defensive_item){
		var defensive_item_score = items[defensive_item].score;
		console.log("D Item: " + defensive_item + " with a score of " + defensive_item_score);
		hoarde.threat = hoarde.threat - items[defensive_item].score;
        console.log("Zombie strength after D item: " + hoarde.threat);
		attack_result("The " + defensive_item + " you placed in the defensive position damaged the zombies!");
	}//end defensive item

	if (hoarde.threat > 0) {
		//zombie are still alive!

		//use all the items in the room that hae been discovered
		var weapons = [],
            room_items = house[room].items,
            room_items_length = room_items.length; console.log("NO. of room items: " + room_items_length);

		for(var i=0; i < room_items_length; i++){
			var room_item = room_items[i];
			if ( items[room_item].discovered === 1) {
				weapons.push(room_item);
			}
		}

		//start doing the math for those items
		var weapons_length = weapons.length; console.log("NO. of weapons: " + weapons_length);
        for(var i=0; i < weapons_length; i++){
			var weapon = weapons[i];
			var damage = items[weapon].score;
			hoarde.threat -= damage;
			attack_result("You hit the zombies with " + weapon + " for " + damage + " damage!");
		}

		console.log("Zombie threate after room weapons: " + hoarde.threat);
		//zombies still alive? Use your personal items
		if (hoarde.threat > 0) {
			if(survivor.hand.length > 0) {
                var first_hand = survivor.hand[0]; console.log("You use your " + first_hand);
				var hand_score = items[first_hand].score;
				hoarde.threat -= hand_score;
                survivor.hand.shift();
                attack_result("You use the " + first_hand + " in your hand for " + hand_score + " damage!");
			}

			console.log("Zombie threat after 1st hand weapon: " + hoarde.threat);
			if (hoarde.threat > 0) {
				//STILL MORE ZOMBIES! use second personal weapon
				if(survivor.hand.length > 0){
					var second_hand = survivor.hand[0]; console.log("You use your " + second_hand);
                    var hand_score = items[second_hand].score;
					hoarde.threat -= hand_score;
                    survivor.hand.shift();
                    attack_result("You use the " + second_hand + " in your hand for " + hand_score + " damage!");
				}

				console.log("Zombie threat after 2nd hand weapon: " + hoarde.threat);
				if (hoarde.threat > 0) {
					//YOU DIED!
					return false;
				}else{
					return true;
				}

			}else{
				return true;
			}

		}else{
			return true;
		}
	}else{
		//you defeated the zombies!
		return true;
	}

}//end skirmish

//should spruce the victory and defeate functions up justa bit

function victory() {
    attack_result("You slither away from a zombies grasp and bound out an open doorway. You run as fast as you can and don't even think of looking about. You've survived for today.");
}

function defeat() {
    attack_result("You dive for the open window but a zombie grabs your leg and sinks its teeth into your calf. You feel the blood run down your feet and the room starts to go dark. You're oddly at peace and feel like you're going home...");
}
