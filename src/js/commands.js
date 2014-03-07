$(document).ready(function(){

    updateLocation("garage");
    clearCommands();
    $("#commands").prop("disabled", false);
    
    var dateObj = new Date();
    dateObj.setMinutes(dateObj.getMinutes() + 3); //production
    //dateObj.setSeconds(dateObj.getSeconds() + 7); //debugging
    
    $('#timer').countdown(dateObj, function(event) {
        $(this).html(event.strftime('%M:%S'));
    }).on('finish.countdown', attack);
    
    //simulate the enter key being pressed (for mobile devices mostly)
    $("#enter").click(function(){
        var e = jQuery.Event("keypress");
        e.which = 13; // # Some key code value
        e.keyCode = 13
        $("#commands").trigger(e);
    });
  
    var commands = ["grab", "move", "set", "use", "combine", "look", "examine"];
   
    $("#commands").keypress(function(e) {
        
        //only do something when they press enter
        if(e.which == 13) {
            //cache the commands text input
            var elm = $(this);
            
            //grab the value from the text input
            var command = elm.val();
                        
            //make all words lowercase and split the string into an array
            var command_array = command.toLowerCase().split(" ");           
                        
            //did they type in a valid command
            if ( $.inArray(command_array[0], commands) !== -1 ){
            
                //which command did they issue?
                switch (command_array[0]) {
                    case "grab": 
                        grab(command_array);
                        break;
                    
                    //done 
                    case "move":
                        move(command_array);
                        break;
                    
                    //BROCK - done!
                    case "set":
                        set(command_array);
                        break;
                    
                    //WILL
                    case "use":
                        use(command_array);
                        break;
                    
                    //PHASE 2
                    case "combine":
                        combine(command_array);
                        break;
                    
                    //RYAN - done!
                    case "look":
                        look(command_array); 
                        break;
                    
                    //BRAD
                    case "examine":
                        examine(command_array);
                        break;
                    
                }
                
            }else{
                //didn't give me a valid command
                result("You're so scared, you aren't giving valid commands!");
            }
            
            //empty the #command box
            elm.val("");
        }
    });
    
    function result(text){
        var elm = $('#output');        
        elm.children("p").removeClass("active");
        elm.append("<p class='active'>"+text+"</p>");   
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
            if( updateInventory(item) ) result("You add " +item+" to your inventory");
        }else if(item === house[survivor.location].defense.item){
            //the item was in the defensive position
            
            //add defensive item to your inventory
            updateInventory(item);            

            //remove it from the defensive position
            house[survivor.location].defense.item = "";
            
            result("You remove the "+item+" from the "+house[survivor.location].defense.name);
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
    
    function move(command){
        //where are you trying to go
        var destination = command[2];
        
        //can you move there
        if ( $.inArray(destination, house[survivor.location].nextTo) !== -1 ){
            //yes you can move
            result("You move to the " + destination);
            updateLocation(destination);
        }else{
            result("You cannot move to that room directly from the room you're in");
        }
    }//end move

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
                        
            result(room_desc + " " + items_desc + " " + hoarde_desc);
        }else{
            result("You're eyes well up with tears as you realize you're about to die...");
        }
    } //end look

    //BEGIN THE ATTACK!!
    function attack(){
        $("#commands").prop("disabled", "disabled");
    
        //REMOVE LATERS - use for debugging
        //var exit_room = "garage";
    
        if(survivor.location === exit_room){
            //you are in the exit room!
            if( skirmish(exit_room) ){
                result("You WIN!");
            }else{
                result("You lose!");
            }
        }else if (  $.inArray(exit_room, house[survivor.location].nextTo !== -1) ) {
            //you're in the room that is next to the exit!
            result("You're next to the exit!");
        }else{
            //you must travel the house to get to the exit!
            result("You're far away from the room!");
        }
            
    }
    
    //deal with battles
    //pass it a room and it will calculate whether the survivor lives or dies
    //will return false on death, true on survival
    function skirmish(room) {
        var direction = house[room].direction;
        var hoarde = zombies.filter(function (obj) {
              return obj.direction === direction;
            })[0];
        
        console.log("Initial Zombie Threat: " + hoarde.threat);
        result("You hear the zombies directly outside the window. They're coming for you.");
        
        var defensive_item = house[room].defense.item;
        if(defensive_item){
            var defensive_item_score = items[defensive_item].score;
            console.log("D Item: " + defensive_item + " with a score of " + defensive_item_score);
            console.log("Zombie strenght: " + hoarde.threat);
            hoarde.threat -= house[room].defense.item;
            result("The defensive item you placed damaged the zombies!");
        }//end defensive item
            
        console.log("Zombie threat after defensive item " + hoarde.threat);
        if (hoarde.threat > 0) {
            //zombie are still alive!
            
            //use all the items in the room that hae been discovered
            var weapons = [];
            var room_items = house[room].items;
            for(var i=0; i < room_items.length; i++){
                var room_item = room_items[i];
                if ( items[room_item].discovered ) {
                    weapons.push = room_item;
                }
            }
            
            //start doing the math for those items
            for(var i=0; i < weapons.length; i++){
                var weapon = weapons[i];
                var damage = items[weapon].score;
                hoarde.threat -= damage;
                result("You hit the zombies with " + weapon + "!");
            }
            
            console.log("Zombie threate after room items: " + hoarde.threat);
            //zombies still alive? Use your personal items
            if (hoarde.threat > 0) {
                if(survivor.hand1) {
                    var hand1_score = items[survivor.hand1].score;
                    hoarde.threat -= hand1_score;
                    //TO DO - remove item from survivor object
                }
                
                console.log("Zombie threat after 1st hand weapon: " + hoarde.threat);
                if (hoarde.threat > 0) {
                    //STILL MORE ZOMBIES! use second personal weapon
                    if(survivor.hand1){
                        var hand2_score = items[survivor.hand2].score;
                        hoarde.threat -= hand2_score;
                        //TO DO - remove item fro survivor object
                    }
                    
                    console.log("Zombie threat after 2nd hand weapon: " + hoarde.threat);
                    if (hoarde.threat > 0) {
                        //YOU DIED!
                        return false;
                    }else{
                        return("You bashed the zombies with your " + survivor.hand2);
                        return true;
                    }
                    
                }else{
                    return("You bashed the zombies with your " + survivor.hand1);
                    return true;
                }
                
            }else{
                return("You bashed the zombies with your " + survivor.hand1);
                return true;
            }
        }else{
            //you defeated the zombies!
            result("You defeated the zombies!");
            return true;
        }
    
    }//end skirmish
    
    
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
    } else { result("Item isn't here!");
        }
    }
    
    
});


