module.exports = {
 config: {
 name: "topbal",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: "Top 10 Rich Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 10);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);
 
 const messageText = `❏ 𝗧𝗼𝗽 𝟭𝟬 𝗥𝗶𝗰𝗵𝗲𝘀𝘁 𝗨𝘀𝗲𝗿𝘀:\n\n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};