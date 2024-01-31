module.exports = {
  config: {
    name: "ytlink",
    version: "1.0",
    author: "Samir Œ, recode: jii",
    countDown: 5,
    role: 0,
    category: "music"
  },

  onStart: async function ({ api, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const ytdl = require("@distube/ytdl-core");
    const yts = require("yt-search");

    const input = event.body;
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("Please put a song", event.threadID);
    }

    data.shift();
    const identifier = data[0];

    try {
      let send = await api.sendMessage(`⌛ Searching your video 🔎`, event.threadID);

      let video;
      if (identifier.startsWith("http")) {
        // If the input is a YouTube link
        video = await ytdl.getBasicInfo(identifier);
      } else {
        // If the input is not a link, perform a search
        const song = data.slice(1).join(" ");
        const searchResults = await yts(song);
        
        if (!searchResults.videos.length) {
          return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
        }

        video = searchResults.videos[0];
      }

      const videoUrl = video.videoDetails.video_url;

      const stream = ytdl(videoUrl, { quality: 'highestvideo' });

      const fileName = `video.mp4`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
      });

      stream.on('end', async () => {
        console.info('[DOWNLOADER] Downloaded');
        await api.unsendMessage(send.messageID);

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('The file could not be sent because it is larger than 25MB.', event.threadID);
        }

        const message = {
          body: `Title: ${video.videoDetails.title}\nArtist: ${video.videoDetails.author.name}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};