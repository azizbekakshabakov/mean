const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const cors = require('cors');

const app = express();
const jsonParser = express.json();

const url = "mongodb://admin:admin@127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
app.use(express.static(`${__dirname}/public`));
app.use(cors({
    origin: '*'
}));

(async () => {
    try {
       await mongoClient.connect();
       app.locals.collection = mongoClient.db("university").collection("students");
       app.listen(5000);
       console.log("Сервер ожидает подключения...");
   }catch(err) {
       return console.log(err);
   } 
})();

app.get("/api/students", async(req, res) => {
          
    const collection = req.app.locals.collection;
    try{
        const students = await collection.find({}).toArray();
        res.send(students);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }  
});

app.get("/api/students/:id", async(req, res) => {
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const student = await collection.findOne({_id: id});
        if (student) res.send(student);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/api/students", jsonParser, async(req, res)=> {
    console.log(req.body);
         
    if(!req.body) return res.sendStatus(400);
         
    const studentName = req.body.name;
    const studentEmail = req.body.email;
    const studentPassword = req.body.password;
    const studentBirthDay = req.body.birthDay;
    const studentGender = req.body.gender;
    const student = {name: studentName, email: studentEmail, password: studentPassword, birthDay: studentBirthDay, gender: studentGender};
         
    const collection = req.app.locals.collection;
      
    try{
        await collection.insertOne(student);
        res.send(student);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.delete("/api/students/:id", async(req, res)=>{
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const result = await collection.findOneAndDelete({_id: id});
        const student = result;
        if (student) res.send(student);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.put("/api/students", jsonParser, async(req, res)=>{
          
    if (!req.body) return res.sendStatus(400);
    const studentName = req.body.name;
    const studentEmail = req.body.email;
    const studentPassword = req.body.password;
    const studentBirthDay = req.body.birthDay;
    const studentGender = req.body.gender;
         
    const collection = req.app.locals.collection;
    try {
        const id = new objectId(req.body.id);
        const result = await collection.findOneAndUpdate({_id: id}, { $set: {email: studentEmail, name: studentName, password: studentPassword, birthDay: studentBirthDay, gender: studentGender}},
         {returnDocument: "after" });
 
        const student = result;
        if (student) res.send(student);
        else res.sendStatus(404);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*async function run() {
    try {
        await mongoClient.connect();
        
        const db = mongoClient.db("university");
        const collection = db.collection("students");
        const user = {
            name: "Tom",
            age: 28
        };
        const result = await collection.insertOne(user);

        console.log(result);

        return collection;
    } catch (err) {
        console.log(err);
    }
}

async function stop() {
    await mongoClient.close();
    console.log("Подключение закрыто");
}

async function main() {
    
    console.log(111111);
    console.log(await collection.countDocuments());
    stop();
}

const collection = run().catch(console.log);

main();*/
