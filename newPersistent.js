var amqp = require('amqplib');
var db = require('./persistent');

var ACK = 2;

amqp.connect('amqp://guest:guest@192.168.1.103:5672').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {

    var ok = ch.assertQueue('iot/logs', {durable: false});

    ok = ok.then(function(_qok) {        
      return ch.consume('iot/logs', function(msg) {
        if(ACK == 2){
              db.databaseInsert();
              ACK--;
        } else if (ACK == 1){
          ACK--;
        }else if (ACK == 0){
          ACK=2;
        }
        console.log(" [x] Received '%s'", msg.content.toString()+"value:"+ACK);
      }, {noAck: true});
    });
    


        //quando la coda è vuota inizialmente
    return ok.then(function(_consumeOk) {
      console.log(' [*] TRAFFICLIGHT STATE --- NOW: GREEN ');
    });
  });
}).catch(console.warn);

