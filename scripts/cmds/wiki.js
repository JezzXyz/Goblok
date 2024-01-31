const axios = require('axios');

const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

module.exports = {
  config: {
    name: 'wiki',
    version: '1.0.0',
    author: 'Lance Ajiro',
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Fetches a complete summary of a Wikipedia page',
    },
    longDescription: {
      en: 'This command fetches a complete summary of a Wikipedia page based on the provided page title. It provides information about the page title, description, and an extract.',
    },
    category: 'study',
    guide: {
      en: '{pn} [page title]',
    },
  },
  onStart: async function ({ api, event, args, message }) {
    const searchTerm = args.join(' ');

    if (!searchTerm) {
      message.reply('Please provide a search term.');
      return;
    }

    try {
      const response = await axios.get(`${WIKIPEDIA_API}${encodeURIComponent(searchTerm)}`);
      const { title, description, extract } = response.data;

      const replyMessage = `${title}\n- ${description}\n\n${extract}`;
      message.reply(replyMessage);
    } catch (error) {
      console.error('Error:', error);
      message.reply('An error occurred while searching on Wikipedia. Please try again later.');
    }
  },
};
