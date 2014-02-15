$(document).ready(function(){

    updateLocation("garage");
    clearCommands();

    //Phase 3 - setTimeout() for attack
    $("#attack").click( attack );
    
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
        result(on_enter);
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
            survivor.inventory.push(item);
        }
        
        //loop through all items in inventory and place them on index page
        var li = "";
        $.each(survivor.inventory, function(index, value){
            li += "<li>"+value+"</li>";            
        });
        
        $("#inventory ul").empty().append(li);

    }  
    
    function clearCommands(){
        $("#commands").val("");
    }
    
    function grab(command){
        //what item are you grabbing?
        var item = command[1];
                
        //is the item you want to grab in the room you're in
        if ( $.inArray(item, house[survivor.location].items) !== -1 ){
            //YES! The item is there
                
            //find the index of the item in the room
            var room_index = house[survivor.location].items.indexOf(item);
            house[survivor.location].items.splice(room_index, 1);
            
            //add item to your inventory
            updateInventory(item);
            
            result("You add " +item+" to your inventory");
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
            var description = house[survivor.location].description;
            
            result(description);
        }else{
            result("You're eyes well up with tears as you realize you're about to die...");
        }
    } //end look
    
});
