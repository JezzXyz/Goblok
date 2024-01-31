const fishList = [
  { name: 'Safir', price: 63 },
  { name: 'Topaz', price: 48 },
  { name: 'Quartz', price: 65 },
  { name: 'Zamrud', price: 76 },
  { name: 'Ruby Star', price: 97 },
  { name: 'Crystal', price: 558 },
  { name: 'Gold', price: 105 },
  { name: 'Emerald', price: 559 },
  { name: 'Jade', price: 442 },
  { name: 'Diamond 💎', price: 265 },
  { name: 'Misteri Box 📦', price: 5550 },
  { name: 'Eek anime 💩', price: 29999998885 }
];
module.exports = {
  config: {
    name: 'mined',
    version: '1.0',
    author: 'loufi libra | recode wahid',
    alias: 'fg',
    countDown: 5,
    role: 0,
    category: 'game',
    en: {
      invalid_amount: 'Invalid amount.',
      not_enough_money: 'Tidak Cukup Euro, Cek Euro Anda Terlebih Dahulu.',
      minimum_balance_required: 'Minimal Bertaruh 1000€.'
    }
  },
  onStart: async function ({ args, message, event, usersData, prefix }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Harap Masukkan Jumlah Taruhan.');
    }

    if (amount > userData.money) {
      return message.reply('Tidak Cukup Euro, Cek Euro Anda Terlebih Dahulu...');
    }

    userData.money -= amount;
    await usersData.set(senderID, userData);

    async function goFishing(userId) {
      const user = (await usersData.get(userId)) || {};
      let userBalance = user.money || 0;

      const fishCaught = Math.random() < 0.70;

      if (fishCaught) {
        const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
        const fishValue = randomFish.price * amount;

        userBalance += fishValue;

        user.money = userBalance;
        await usersData.set(userId, user);

        const replyMessage = `\n[ ⛏ 𝗠𝗜𝗡𝗘𝗗 ⛏ ]\n\n• 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀! ✨\n• 𝗬𝗼𝘂𝗿 𝗚𝗼𝘁 𝗮 𝗦𝘁𝗼𝗻𝗲𝘀:\n«${randomFish.name}»\n• 𝗧𝗼𝘁𝗮𝗹 𝗕𝗮𝗹𝗮𝗻𝗰𝗲 𝗘𝗮𝗿𝗻𝗲𝗱: ${fishValue}$💶.\n🔰 | 𝗠𝗶𝗻𝗲𝗱 ⛏.`;
        return message.reply(replyMessage);
      } else {
        const replyMessage = '🍌 | Kamu Dapat Kontol Admin.';
        return message.reply(replyMessage);
      }
    }

    await goFishing(senderID);
  },
};