const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
    console.error("❌ MONGO_URL is missing in .env");
    process.exit(1);
}

const client = new MongoClient(mongoURL);

let passwordsCollection;


async function startServer() {
    try {
        await client.connect();

        console.log("✅ Connected to MongoDB");

        const db = client.db("PassOp");

        passwordsCollection = db.collection("password");

        console.log("✅ Database: PassOp");
        console.log("✅ Collection: password");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ MongoDB connection failed:");
        console.error(error);
        process.exit(1);
    }
}



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PassOP Backend is running"
    });
});

app.post("/master-passkey/verify", (req, res) => {

    const { passkey } = req.body;

    if (!passkey) {
        return res.status(400).json({
            success: false,
            message: "Passkey is required"
        });
    }

    if (String(passkey) === String(process.env.MASTER_PASSKEY)) {

        return res.status(200).json({
            success: true,
            message: "Master passkey verified"
        });

    }

    return res.status(401).json({
        success: false,
        message: "Invalid master passkey"
    });
});

app.get("/passwords", async (req, res) => {

    try {

        const passwords = await passwordsCollection
            .find({})
            .toArray();

        res.status(200).json({
            success: true,
            result: passwords
        });

    } catch (error) {

        console.error("GET /passwords error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch passwords"
        });
    }
});

app.post("/passwords", async (req, res) => {

    try {

        const { site, username, password } = req.body;

       
        if (!site || !username || !password) {

            return res.status(400).json({
                success: false,
                message: "Site, username and password are required"
            });
        }

        const newPassword = {
            site: site,
            username: username,
            password: password
        };

        const result = await passwordsCollection.insertOne(
            newPassword
        );

      
        const savedPassword =
            await passwordsCollection.findOne({
                _id: result.insertedId
            });

        res.status(201).json({
            success: true,
            result: savedPassword
        });

    } catch (error) {

        console.error("POST /passwords error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save password"
        });
    }
});


app.delete("/passwords/:id", async (req, res) => {

    try {

        const { id } = req.params;

       
        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid password ID"
            });
        }

        const result =
            await passwordsCollection.deleteOne({
                _id: new ObjectId(id)
            });

        if (result.deletedCount === 0) {

            return res.status(404).json({
                success: false,
                message: "Password not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Password deleted successfully"
        });

    } catch (error) {

        console.error("DELETE /passwords error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete password"
        });
    }
});


startServer();