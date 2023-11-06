const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json()); 

const CONNECTION_STRING = "";
const DATABASE_NAME = "todoapp";
let database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Mongo DB Connection Error:", error);
      return;
    }
    database = client.db(DATABASE_NAME);
    console.log("Mongo DB Connection Successful");
  });
});

app.get('/api/todoapp/getNotes', (request, response) => {
  database.collection("todoappcollection").find({}).toArray((error, result) => {
    if (error) {
      console.error("Error fetching notes:", error);
      response.status(500).json({ error: "Error fetching notes" });
    } else {
      response.json(result);
    }
  });
});

app.post('/api/todoapp/addNotes', (request, response) => {
  database.collection("todoappcollection").countDocuments({}, (error, numOfDocs) => {
    if (error) {
      console.error("Error counting documents:", error);
      response.status(500).json({ error: "Error counting documents" });
    } else {
      database.collection("todoappcollection").insertOne({
        id: (numOfDocs + 1).toString(),
        description: request.body.newNotes
      }, (insertError) => {
        if (insertError) {
          console.error("Error adding a new note:", insertError);
          response.status(500).json({ error: "Error adding a new note" });
        } else {
          response.json("Added Successfully");
        }
      });
    }
  });
});

app.delete('/api/todoapp/deleteNotes', (request, response) => {
  const id = request.query.id;
  database.collection("todoappcollection").deleteOne({ id: id }, (deleteError) => {
    if (deleteError) {
      console.error("Error deleting a note:", deleteError);
      response.status(500).json({ error: "Error deleting a note" });
    } else {
      response.json("Delete Successfully");
    }
  });
});
