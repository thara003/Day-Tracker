const express = require("express");
const app = express();
const dotev = require('dotenv').config();
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

// app.use("/static",express.static("public"));
app.use(express.static('./public'));

app.set("view engine", "ejs");

///////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
///////////////////////////////////////////////

mongoose
    .connect(
        `mongodb+srv://test:Nq3odmAgOKFykjcH@cluster0.k926j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(3000, () => console.log("Server Up and running"));
       
    })
    .catch((err) => {
        console.log(err);
    });
    
//////////////////////////////////////////////////

app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
    });

app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });  
    
    app.route("/remove/:id").get((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
        });   
// app.listen(3000, () => console.log("Server Up and running"));