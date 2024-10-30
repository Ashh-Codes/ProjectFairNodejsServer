const express = require('express')
const cors =require('cors')
require('dotenv').config()
const router =require('./routes/router')
require('./dbConnections/connection')

const pfserver =express()

pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))


const PORT =3000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`PFserver  started at port:${PORT} and waiting for client request`);
    
})

pfserver.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">PFserver  started  and waiting for client request<h1/>`)
})

pfserver.post('/',(req,res)=>{
    res.status(200).send(`post request recieved`)
})