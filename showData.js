var mysql = require('mysql');

//connection
var HOST = "localhost";
var USER = "root";
var PASS = "password";
var MYDB = "trafficlights";

var showData = "SELECT * FROM calls";


var con = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    database: MYDB
  });
  

    con.connect(function(err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query(showData, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });

      });

      
      