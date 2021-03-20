const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const startAssistant = () => {
  return new AssistantV2({
    version: process.env.APP_ASSISTANT_VERSION,
    authenticator: new IamAuthenticator({
      apikey: process.env.APP_ASSISTANT_APIKEY,
    }),
    serviceUrl: process.env.APP_ASSISTANT_URL,
    disableSslVerification: true,
  });
};

const createAssistantSession = async () => {
  const assistant = startAssistant();

  return new Promise((resolve, reject) => {
    assistant
      .createSession({
        assistantId: process.env.APP_ASSISTANT_ID,
      })
      .then(res => resolve(res.result.session_id))
      .catch(err => reject(err));
  });
};

const askTheBot = (sessionId, text) => {
  const assistant = startAssistant();

  return new Promise((resolve, reject) => {
    assistant
      .message({
        assistantId: process.env.APP_ASSISTANT_ID,
        sessionId,
        input: {
          message_type: "text",
          text,
        },
      })
      .then(res => {
        console.log(["", "Pergunta: " + text, "Resposta: " + res?.result?.output?.generic[0]?.text].join("\n"));
        resolve(res?.result?.output?.generic[0]?.text);
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  createAssistantSession,
  askTheBot,
};
