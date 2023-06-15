const express = require('express');
const mysql = require('mysql');
const routes = require('./route/route');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: 'replace',
    port: 3306,
    user: 'replace',
    password: 'repla w',
    database: 'replace'
  })
  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('Hello ! My self mysql db, I am also connected and running with server.');
  });


  app.use((req, _res, next) =>{
  req.con= connection
  next();
  });

  app.use('/', routes);


  const port = process.env.PORT || 4000;
  app.listen(port, () =>{
    console.log(`Hello ! Myself local server, and I am running at http://localhost:${port}`);
  });