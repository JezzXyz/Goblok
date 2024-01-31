const axios = require('axios');

module.exports = {
  config: {
    name: "minstral",
    author: "cliff", // credits owner of this api
    countDown: 5,
    role: 0,
    category: "member",
    shortDescription: {
      en: ""
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const { messageID, messageReply } = event;
      let prompt = args.join(' ');

      if (messageReply) {
        const repliedMessage = messageReply.body;
        prompt = `${repliedMessage} ${prompt}`;
      }

      if (!prompt) {
        return api.sendMessage('Please provide a prompt to generate a text response.\n\nminstral {prompt}\nExample: minstral What is kardashev scale?\n', event.threadID, event.messageID);
      }

      const mnstrl_api = `https://cyni-api-collection.onrender.com/api/minstral?question=${encodeURIComponent(prompt)}`;

      const response = await axios.get(mnstrl_api);

      if (response.data && response.data.response) {
        const generatedText = response.data.response;
        api.sendMessage({ body: generatedText, attachment: null }, event.threadID, event.messageID);
      } else {
        console.error('API response did not contain expected data:', response.data);
        api.sendMessage('❌ An error occurred while generating the text response. Please try again later.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage('❌ An error occurred while generating the text response. Please try again later.', event.threadID, event.messageID);
    }
  }
};