const express = require('express');
const app = express();
// Require body-parser (to receive post data from clients) & path
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demoDB');
mongoose.Promise = global.Promise;

var DbSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean}
})
var Tasks = mongoose.model('Task', DbSchema);

app.get('/', function(req, res){
    res.json({success: "newindex"})
})
//Retrieve all tasks
app.get('/tasks', function(req, res){
    Tasks.find({}, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})

//Get 1 task by id
app.get('/tasks/:id', function(req, res){
    Tasks.findById(req.params.id, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
//Delete 1 task by id
app.delete('/tasks/:id', function(req, res){
    Tasks.findByIdAndRemove(req.params.id, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
//Update 1 task
app.put('/tasks/:id', function(req, res){
    Tasks.findById(req.params.id, function(err, data){
        if(err){
            res.json(err)
        }else{
            if(req.body.title){
                data.title = req.body.title
            }
            if(req.body.description){
                data.description = req.body.description
            }
            if(req.body.completed){
                data.completed = req.body.completed
            }
            data.save(function(err){
                if(err){
                    res.json(err)
                }else{
                    res.json(data)
                }
            })
        }
    })
})

//Create a new task
app.post('/tasks', function(req, res){
    var newtask = Tasks({title: req.body.title, description: req.body.description})
    newtask.save(function(err){
        if(err){
            res.json(err)
        }else{
            res.json(newtask)
        }
    })
})

app.listen(8000, function(){
    console.log("listening at 8000")
})























// // Require the Express Module
// const express = require('express');
// // Create an Express App
// const app = express();
// // Require body-parser (to receive post data from clients) & path
// const bodyParser = require('body-parser');
// const path = require('path');

// // Integrate body-parser with our App
// app.use(bodyParser.json());
// // Tell Express where our views are located
// app.set('views', path.join(__dirname, './views'));
// // Setting our View Engine set to EJS
// app.set('view engine', 'ejs');

// // Require mongoose
// var mongoose = require('mongoose');
// //name of the database
// mongoose.connect('mongodb://localhost/login_regDB');
// mongoose.Promise = global.Promise;

// var DbSchema = new mongoose.Schema({
//     //db schema stuff
// },{
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
// });

// //store the schema and give it a string name
// mongoose.model('Task', DbSchema);
// //get the schema and store it in a usable var
// var User = mongoose.model('Task');



// // basic root route
// app.get('/', function(req, res) {
//     res.json({success:'index'});
// });



// // Setting our Server to Listen on Port: 8000
// app.listen(8000, function() {
//     console.log("listening on port 8000");
// })