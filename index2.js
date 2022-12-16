const express=require("express")
const http=require("http")
const app=express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var randomize = require('randomatic');
const server=http.createServer(app)
const bodyParser=require("body-parser")
const { v4: uuidv4,} = require('uuid');
const port=8081;
const data=[]
app.use(bodyParser.urlencoded({limit:"1mb"}))
app.post("/",(req,res)=>{
    const{Name,Department,DOB,Joining_date}=req.body;
    const userId=uuidv4();
    data.push({
        userId,
        Name,
        Department,
        DOB,
        Joining_date
    })
    res.status(200).send(data)
})
app.get("/getall",(req,res)=>{
    res.status(200).send(data)
})
app.get("/getall/:id",(req,res)=>{
    const filter=data.find(obj=>obj.userId===req.params.id)
    res.status(200).send(filter)
})
app.delete("/:id",(req,res)=>{
    const deleteUser=data.filter(obj=>obj.userId!==req.params.id)
    res.status(200).send(deleteUser)
})
app.put("/update/:id",upload.single('avatar'),(req,res)=>{
    id=req.params.id;
    index=data.find(obj=>obj.userId===id)
    const dataFind=data.indexOf(index)
    data[dataFind].Name=req.body.Name
    data[dataFind].Department=req.body.Department
    data[dataFind].file=req.file.originalname
    res.status(200).send(data)
})
server.listen(port,()=>{
    console.log(`The Project is running on ${port}`);
})