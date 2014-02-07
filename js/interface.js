$(document).ready(function(){

    

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
        $("#output p").removeClass("active");
        $("#output").append("<p class='active'>"+text+".</p>");   
    }
    
    function grab(command){
        //what item are you grabbing?
        var item = command[1];
        
        //what location are you in?
        var current_location = self.location;
        
        //check to see if you can do that
        if ( house[current_location].objects[item] ) {
            //the item is there
            result("You grabbed " +item+"!");
        }else{
            result("That item isn't around here...");
        }
    }

});