var amqp = require('amqplib');
        var FUNCTION_NAME = "consumer";
        var STATE = 1; 
        var count = 2; // {0 red, 1 yellow, 2 green}
         function send_feedback(msg){      

            var q = 'iot/logs'; //path
            amqp.connect('amqp://guest:guest@192.168.1.103:5672').then(function(conn) { //connection
                return conn.createChannel().then(function(ch) { //connection channel
                    var ok = ch.assertQueue(q, {durable: false});
                    return ok.then(function(_qok) {
                    ch.sendToQueue(q, Buffer.from(msg));
                    //console.log(" [x] Sent '%s'", msg);
                    return ch.close();
                    });
                }).finally(function() { 
                        conn.close();
                    });
            }).catch(console.warn);
        }

        //change var state
       function decrementCount(){
        return count--;
       }

      function resetCount(){
        return count = 2;
      }

      function changeState(){
        return STATE=1;
      }

    

        //convert from binary to string
        function bin2string(array){
          var result = "";
          for(var i = 0; i < array.length; ++i){
            result+= (String.fromCharCode(array[i]));
          }
          return result;
        }

        exports.handler = function(context, event) {
            var _event = JSON.parse(JSON.stringify(event)); //from JSON to js value
            var _data = bin2string(_event.body.data);
            context.callback("feedback "+_data);
            //context.callback(STATE + " - TL");
            
            //send_feedback("CALL MADE " + _data);
            //send_feedback("CALL MADE!");

            if(STATE==1){
              send_feedback("CALL MADE!");
              STATE--;
            setTimeout(() => {
              decrementCount(), send_feedback("TRAFFICLIGHT STATE CHANGED --- NOW: YELLOW ");
              }, 5000);

              setTimeout(() => {
                decrementCount(), send_feedback("TRAFFICLIGHT STATE CHANGED --- NOW: RED ");
              }, 15000);
            
              setTimeout(() => {
                resetCount(), send_feedback("TRAFFICLIGHT STATE RESET --- NOW: GREEN ");
              }, 30000);

              setTimeout(() => {
                changeState()
              }, 30010);
            }else{
              send_feedback("CALL ALREDY MADE!");
            }
        };
        