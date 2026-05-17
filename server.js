const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local PC ကနေ Docker ထဲက MongoDB ဆီ လှမ်းချိတ်မယ့် လင့်ခ် (Password ကို secret လို့ ပြင်ထားပါတယ်)
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";
const dbName = "user_profile"; // မင်း Mongo-Express ထဲမှာ မြင်ရတဲ့ Database နာမည်အတိုင်း ပြင်လိုက်ပါပြီ

// Home route - index.html ဖိုင်ကို ပို့ပေးမယ့်နေရာ
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Profile database ထဲ ဒေတာထည့်မယ့် API
app.post('/update-profile', async function (req, res) {
    const userObj = req.body;
    let dbClient;

    try {
        // ၁။ ဒေတာဘေ့စ်ဆီ စတင်ချိတ်ဆက်မယ်
        dbClient = await MongoClient.connect(mongoUrlLocal);
        const db = dbClient.db(dbName);

        // ၂။ user_profile database ထဲက "users" ဆိုတဲ့ collection ထဲကို ဒေတာ ထည့်မယ်
        await db.collection("users").insertOne(userObj);

        // ၃။ အောင်မြင်ရင် browser ဆီ ဒေတာပြန်ပို့မယ်
        res.send(userObj);

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Database error occurred!" });
    } finally {
        if (dbClient) {
            dbClient.close();
        }
    }
});

app.listen(3000, function () {
    console.log("App listening on port 3000!");
});