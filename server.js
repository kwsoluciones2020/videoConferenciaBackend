require("rootpath")();
const express = require('express');
const fileUpload = require('express-fileupload')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');
const userRoutes = require('./users/routes');
const sendEmail = require("./utils/email")
const ejs = require("ejs")
fs = require("fs"); 
NOMBRE_ARCHIVO = __dirname + "/mail.txt";




var cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
app.use(cors());

dotenv.config();
app.use(cookieParser());

dotenv.config();
app.use(cookieParser());
const port = 4000;
app.use(express.json());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ limit: "150mb", extended: false }));


app.use('/api/v1', userRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));