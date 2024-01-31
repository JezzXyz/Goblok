const axios = require('axios');

module.exports = {
  config: {
    name: 'chat',
    version: '1.0',
    author: 'Yan Maglinte',
    role: 0,
    longDescription: 'Chat with Openchat AI',
    category: 'AI',
    guide: '{pn} ai [query]',
  },

  onStart: async function ({ api, event, args, usersData }) {
    const query = args.join(' ');

    if (!query) {
      api.sendMessage('Please enter a query for Openchat AI.', event.threadID);
      return;
    }

    const conversation = usersData[event.senderID]?.openchatHistory || [];

    try {
      const res = await axios.post('https://yanmaglinte.onrender.com/openchat', {
        prompt: query,
        system: 'From now on you are Openchat, that will be your name, developed by Yan Maglinte who is a 17 year old boy who loves to code. Add some emojis to your contents to make it adorable.',
        conversation,
      });

      const output = res.data.result;

      conversation.push({ role: 'user', content: query });
      conversation.push({ role: 'assistant', content: output });

      usersData[event.senderID].openchatHistory = conversation;

      api.sendMessage(output, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while interacting with Openchat AI.', event.threadID);
    }
  },
};