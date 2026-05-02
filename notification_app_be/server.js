const express = require("express");
const cors = require("cors");
const logger = require("../logging_middleware/index");
const app = express();
app.use(express.json());
app.use(logger);
let notifications = [];
app.use(cors());
app.get("/", (req, res) => {
    res.send("Sever is working");
});
app.get("/notifications", (req, res) => {
    res.json([
        { id: 1, message: "Placement drive tomorrow" },
        {id: 2, message: "Exam results released" }
    ]);
});
app.post("/notifications", (req, res) => {
    const { message } = req.body;
    const newNotification = {
        id: notifications.length + 1,
        message: message
    };
    notifications.push(newNotification);
    res.status(201).json(newNotification);
});
app.put("/notifications/id", (req, res) => {
    const id = parseInt(req.params.id);
    const { message } = req.body;
    const notification = notifications.find(n => n.id === id);
    if(notification){
        notification.message = message;
        res.json(notification);
    }else{
        res.status(404).send("Not found");
    }
});
app.delete("/notifications/:id", (req, res) => {
    const id = parseInt(req.params.id);
    notifications = notifications.filter(n => n.id !== id);
    res.send("Deeted successfully");
});
app.listen(3000, () => {
    console.log("Sever running on port 3000");
});