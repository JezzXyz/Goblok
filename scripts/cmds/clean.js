const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "clean",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "help to clean cache and tmp folder"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },

  onStart: async function ({ api, event }) {
    const tmpFolderPath = path.join(__dirname, 'tmp');
    const cacheFolderPath = path.join(__dirname, 'cache');

    // Function to clean folder contents
    const cleanFolderContents = (folderPath) => {
      if (fs.existsSync(folderPath)) {
        const items = fs.readdirSync(folderPath);

        items.forEach(item => {
          const itemPath = path.join(folderPath, item);
          const stats = fs.statSync(itemPath);

          if (stats.isFile()) {
            fs.unlinkSync(itemPath);
            console.log(`File ${item} deleted successfully from ${folderPath}!`);
          } else if (stats.isDirectory()) {
            cleanFolderContents(itemPath);
          }
        });

        console.log(`All files in the ${folderPath} folder deleted successfully!`);
      } else {
        console.log(`${folderPath} folder not found.`);
      }
    };

    // Clean tmp folder
    api.sendMessage({ body: 'Cleaning tmp folder...', attachment: null }, event.threadID, () => {
      cleanFolderContents(tmpFolderPath);
      api.sendMessage({ body: 'All files in tmp folder cleaned successfully!' }, event.threadID);
    });

    // Clean cache folder
    api.sendMessage({ body: 'Cleaning cache folder...', attachment: null }, event.threadID, () => {
      cleanFolderContents(cacheFolderPath);
      api.sendMessage({ body: 'Cache folder cleaned successfully!' }, event.threadID);
    });
  },
};