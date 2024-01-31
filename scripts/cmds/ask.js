const axios = require('axios');

const Prefixes = [
  'ae',
  'ai',
  'mitama',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip | Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("🔸𝘼𝙀-𝙎𝙏𝙃𝙀𝙍🔹 | 💬🔹\n\n✦/ᐠ - ˕ -マ✦...?");
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = `🔹𝘼𝙀-𝙎𝙏𝙃𝙀𝙍🔸:\n\n${response.data.answer}\n--------------------------------------\n  [♡${senderName}]~🌸`;

      await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};