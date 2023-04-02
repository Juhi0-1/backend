const express = require('express');

const mysql = require("mysql2");
const cors  = require("cors");
const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Juhi@12",
    database:"blog"
})

app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.json("Hello This is the backend")
})

app.get("/blogs", (req,res)=>{
    const query = "SELECT * FROM blogs"
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/blogs/:id", (req, res) => {
    const blogId = req.params.id;
    
    db.query('SELECT * FROM blogs where id=?',blogId,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
  });

app.post("/blogs",(req, res)=>{
    const q = "INSERT INTO blogs (`title`, `desc`,`cover`) VALUES (?) "
    const values = [
       req.body.title, 
       req.body.desc,
       req.body.cover
    ]

    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Blog has been created ")
    })
})

  
app.listen(8000, ()=>{
    console.log("Connected to backend");
})