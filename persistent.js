var mysql = require('mysql');

//connection
var HOST = "localhost";
var USER = "root";
var PASS = "password";
var MYDB = "trafficlights";

//query
var insertData = "INSERT INTO calls () VALUES();";


var con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASS,
  database: MYDB
});


module.exports = {
  databaseInsert: function(){
    con.connect(function(err) {
      console.log("Database connected!");
      con.query(insertData, function (err, result) {
        if (err) throw err;
        console.log("1 data inserted");
      });
      
    });
}, 
 

}
