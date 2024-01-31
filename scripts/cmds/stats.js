module.exports = { config: { name: "stats", aliases: [""], version: "1.0", author: "𝗪𝗮𝗵𝗶𝗱 𝗞𝟯𝗰𝗲", countDown: 5, category: "System", role: 0, shortDescription: { en: "Show user information details", tl: "" }, longDescription: { en: "user information", tl: "" }, guide: { en: "{p}statik", tl: "{p}statik" } }, onStart: async function ({ event, api, usersData }) { try { const userInfo = await api.getUserInfo(event.senderID); if (!userInfo || !userInfo[event.senderID]) { throw new Error('error not found.'); } const { money, exp, status, country } = await usersData.get(event.senderID); const uid = event.senderID.split(':').pop(); const statusLabel = status === "online" ? "Online" : "Online"; const countryLabel = country === "🇮🇩" ? "🇮🇩" : "🇮🇩"; const name = userInfo[event.senderID].name; const randomNum = Math.floor(Math.random() * 100) + 1; const rankInfo = `❏──────────────❏\n│# 𝗦𝗧𝗔𝗧𝗜𝗞 𝗨𝗦𝗘𝗥:\n│\n│📋 𝗡𝗮𝗺𝗲: ${name}\n│💰 𝗪𝗼𝗻: ${money} ₩\n│🏅 𝗘𝗫𝗣: ${exp} XP\n│🔹 𝗦𝘁𝗮𝘁𝘂𝘀: • ${statusLabel}\n│🧠 𝗧𝗶𝗻𝗴𝗸𝗮𝘁 𝗞𝗲𝘁𝗼𝗹𝗼𝗹𝗮𝗻: ${randomNum}%\n│🇦🇶 𝗖𝗼𝘂𝗻𝘁𝗿𝘆: ${countryLabel}\n│❖ 𝗙𝗕 𝗨𝗜𝗗: ${uid}\n❏──────────────❏\n\n`; api.sendMessage(rankInfo, event.threadID); } catch (error) { api.sendMessage(`Ada Kesalahan: ${error.message}`, event.threadID); } } };