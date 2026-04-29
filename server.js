const express = require('express');
const path = require('path');
require("dotenv").config(); 

const ConnectDB = require('./config/db')

ConnectDB();

const app = express();

// ✅ Import route (correct file name)
const authRouter = require("./routes/authRouter");
const taskRoutes = require("./routes/taskRoute");
const notesRouter = require('./routes/notesRouter')




app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());

app.use("/api/auth", authRouter); 
app.use("/api/tasks", taskRoutes);
app.use("/api/notes",notesRouter);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"public/dashboard.html"));
})

app.listen(3000,()=>{
  console.log("Server runing at 3000"); 
})
