module.exports = {
 config: {
 name: "topexp",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: "Top 10 Highest EXP"
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
 
 const topUsers = allUsers.sort((a, b) => b.exp - a.exp).slice(0, 10);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.exp}`);
 
 const messageText = `Top 10 Highest EXP:\n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};