import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let collection = await db.collection("liveInventory");
        let results = await collection.find().toArray();
        res.send(results).status(200);
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/", async (req, res) => {
    try {
        let newDocument = {
            IP: req.body.IP,
            DIAG: req.body.DIAG,
            Msg: req.body.Msg,
            Owner: req.body.Owner,
            Platform: req.body.Platform
        };
        let collection = await db.collection("liveInventory");
        let result = await collection.insertOne(newDocument);
        res.status(201).json(result); // Use 201 Created and send the inserted document
    } catch (error) {
        console.error("Error adding node:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("liveInventory");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error("Error deleting node:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates =  {
        $set: {
            IP: req.body.IP,
            DIAG: req.body.DIAG,
            Msg: req.body.Msg,
            Owner: req.body.Owner,
            Platform: req.body.Platform
        }
        };
        let collection = await db.collection("liveInventory");
        let result = await collection.updateOne(query, updates);
    
        res.send(result).status(200);
    } catch (error) {
        console.error("Error updating node:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;