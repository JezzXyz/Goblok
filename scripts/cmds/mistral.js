const axios = require('axios');

module.exports = {
  config: {
    name: "mistral",
aliases: ["mai"],
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "mitral ai",
    category: "ai",
    guide: {
      en: "{p}{n} questions",
    },
  },
  makeApiRequest: async function (lado) {
    try {
      const response = await axios.get(`https://sandipapi.onrender.com/mistral?prompt=${lado}`);
      return response.data.answer;
    } catch (error) {
      throw error;
    }
  },
  handleCommand: async function ({ message, event, args, api }) {
    try {
      const lado = encodeURIComponent(args.join(" "));

      if (!lado) {
        return message.reply("I am here. Please provide input.");
      }

      const result = await this.makeApiRequest(lado);

      message.reply({
        body: ` ${result}`,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onStart: function (params) {
    return this.handleCommand(params);
  },
  onReply: function (params) {
    return this.handleCommand(params);
  },
};