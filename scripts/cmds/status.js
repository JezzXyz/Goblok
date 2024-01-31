const moment = require('moment-timezone');
module.exports = {
  config: {
    name: "status",
    aliases: ["sts"],
    version: "1.5",
    author: "Wahid",
    countDown: 30,
    role: 0,
    shortDescription: {
      en: `bot information`
    },
    longDescription: {
      en: `Check Bot Information`
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${hours} Jam\n• ${minutes} Menit\n• ${seconds} Detik`;

      const now = moment().tz('Asia/Jakarta'); 
      const date = now.format('MMMM Do YYYY'); 
      const time = now.format('h:mm:ss A');
      
      api.sendMessage(`# 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻\n\n•• 𝗕𝗼𝘁 𝗕𝗲𝗿𝗷𝗮𝗹𝗮𝗻:\n• ${uptimeString}\n•• 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿:\n> ${allUsers.length}\n•• 𝗧𝗼𝘁𝗮𝗹 𝗚𝗿𝘂𝗽:\n> ${allThreads.length}\n•• 𝗗𝗮𝘁𝗲:\n> ${date}\n•• 𝗪𝗮𝗸𝘁𝘂:\n> ${time}\n\nＡｊｉ Ｓａｔｒｉａ🌸`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};