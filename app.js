require('dotenv').config();
require('./config/database').connect();
const User = require("./model/user");
const Product = require("./model/product");
const bcrypt = require('bcrypt')
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
let http = require('http');
let fs = require('fs');
const fileUpload = require('express-fileupload')

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const routes = require('./route/index.js')

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: "/tmp",
}))

app.use('/api', routes)
const swaggerJson = require('./swagger/swagger.json')
const swaggerUi = require("swagger-ui-express");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./index.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             respone.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// };

// http.createServer(handleRequest).listen(7000);

app.get('/' , (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
  });
