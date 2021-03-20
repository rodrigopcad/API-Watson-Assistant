require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { askTheBot, createAssistantSession } = require("./assistant.service");

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Chatbot server is running in http://localhost:${PORT}`);
});

app
  .use(express.urlencoded())
  .use(express.json())
  .use(cors({ origin: "*" }))
  .use((request, _response, next) => {
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/startsession", (_, response) => {
  createAssistantSession()
    .then(sessionId => response.send(sessionId))
    .catch(err => {
      console.log(err);
      response.status(500).send();
    });
});

app.post("/askthebot", (request, response) => {
  const { sessionId, text } = request.body;
  askTheBot(sessionId, text)
    .then(data => response.send({ data }))
    .catch(err => {
      console.log(err);
      response.status(500).send();
    });
});
