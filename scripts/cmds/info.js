module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "Aji Satria",
    role: 0,
    shortDescription: {
      en: "Displays information about the bot owner."
    },
    longDescription: {
      en: "Provides details about the bot owner, such as name, and social media links."
    },
    category: "box chat",
    guide: {
      en: "Use {p}info to get information about the bot owner."
    }
  },
  onStart: async function ({ api, event, args }) {
    const ownerName = "Aji Satria";
    const fbLink = "https://www.facebook.com/AJISATRIAXS";
    const prefix = "# (default)";
    
    const infoMessage = `Bot Owner: ${ownerName}\nFacebook: ${fbLink}\nPrefix: ${prefix}`;
    api.sendMessage(infoMessage, event.threadID);
  }
};