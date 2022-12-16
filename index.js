const http=require("http");
const fs=require("fs")
const path=require("path")
const server=http.createServer((req,res)=>{
  
});
const port=8081;
server.listen(port,()=>{
    console.log(`Listening on port : ${port} `);
})

