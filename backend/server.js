const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB = "mydatabase1";


//Acquireiing the routers
const registerRouter = require("./routes/registerRouter/register");
const loginRouter = require("./routes/loginRouter/login");
const recruiterRouter = require("./routes/recruiterRouter/recruiterRouter")
const applicantRouter = require("./routes/applicantRouter/applicantRouter")
const qanda = require("./routes/qandaroutes");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Connection to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/' + DB, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB connection estblished successfully"))


//Setupu API endPoints
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/recr", recruiterRouter);
app.use("/appl", applicantRouter);
app.use("/qanda", qanda)

app.listen(PORT, () => console.log(`Server is running in the localhost on PORT : ${PORT}`));
var d = new Date();
console.log(d.getDay())