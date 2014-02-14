$(document).ready(function(){

    updateLocation("garage");
    clearCommands();
    
    var commands = ["grab", "move", "set", "use", "combine", "look", "examine"];
    var description =(house[survivor.location].description);
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
                    
                    case "move":
                        move(command_array);
                        break;
                    
                    //BROCK
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
                    
                    //RYAN
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
        var enter = house[survivor.location].on_enter;
        console.log(enter);
        result(enter);
        $("#location span").html(survivor.location);
    }
    /*function updateLocationdescription(description) {
        alert("description:" + description);
        house.description = descripton;
        var enter = house.description.items;
        console.log(enter);
        result(enter);
        $("#descripton span").html(house.description);
    }*/
    
    
    function clearCommands(){
        $("#commands").val("");
    }
    
    function grab(command){
        //what item are you grabbing?
        var item = command[1];
                
        //check to see if you can do that        
        if ( $.inArray(item, house[survivor.location].items) !== -1 ){
            //the item is there
            
            //find the index of the item in the room
            var room_index = house[survivor.location].items.indexOf(item);
            house[survivor.location].items.splice(room_index, 1);
            
            //add item to your inventory
            survivor.inventory.push = item;
            
            result("You've added " +item+" to your inventory!");
        }else{
            result("That item isn't in this room!");
        }
    }//end grab
    
    function move(command){
        //where are you trying to go
        var destination = command[2];
        //console.log("Destination: " + destination);
        //console.log(house[survivor.location].nextTo[0]);
        
        //can you move there
        if ( $.inArray(destination, house[survivor.location].nextTo) !== -1 ){
            //yes you can move!
            updateLocation(destination);
            
            result("You moved to the " + destination);
        }else{
            result("You cannot move to that room directly from the room you're in");
        }
    }

    function look(command){
        //look around room
        //var details = command[6];
     
        //console.log("Look: " + look);
        //console.log(house[survivor.location].nextTo[0]);
        
        //Look around the room ...not getting here
        //if ( $.inArray(details, house.description) !== -1 ){
            //yes you can move!
          //  updateLocationdescription(details);
            //   alert("LOOK:" + look)
        if(house[survivor.location].description) {
            
            result(description);
        }else{
            result("You messed up");
        }
    }
});
