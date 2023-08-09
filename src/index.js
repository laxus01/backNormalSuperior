const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require("./configs/config");
const usersPath = "/users";
const campusPath = "/api/campus";
const institutionsPath = "/api/institutions";
const teachersPath = "/api/teachers";
const studentsPath = "/api/students";
const practicesPath = "/api/practices";

// Intializations
const app = express();

// Settings
app.set("port", process.env.PORT || 8084);

app.set("llave", config.llave);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(usersPath, require("./routes/user-route"));
app.use(campusPath, require("./routes/campus-route"));
app.use(institutionsPath, require("./routes/institutions-route"));
app.use(teachersPath, require("./routes/teachers-route"));
app.use(studentsPath, require("./routes/students-route"));
app.use(practicesPath, require("./routes/practices-route"));


app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});


