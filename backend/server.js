const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database')
const mongoose=require('mongoose');
//config
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase();

//Handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)
    process.exit(1);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})



//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled rejection `);

    server.close(()=>{
        process.exit(1);
    })
})