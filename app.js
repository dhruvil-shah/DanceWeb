const express = require("express");
const path = require("path");
const app = express();
const port = 200;
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});



const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    age:Number
  });
  const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
})
app.post('/index',(res,req)=>
{
var data=new Contact(req.bodyparser)
data.save().then(()=>
{
res.send("Data saves successfully");
}).catch(()=>
{
    res.status(400).render("Error occured")
})
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});