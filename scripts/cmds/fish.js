const fishList = [
  { name: 'Salmon', price: 10 },
  { name: 'Trout', price: 11 },
  { name: 'Bass', price: 12 },
  { name: 'Catfish', price: 13 },
  { name: 'Perch', price: 14 },
  { name: 'Pike', price: 15 },
  { name: 'Carp', price: 16 },
  { name: 'hiu', price: 20 },
  {name: 'tuna', price: 9 },
  {name: 'goldfish', price: 25 }
];

module.exports = {
  config: {
    name: 'fish',
    version: '1.0',
    author: 'loufi libra🦔',
    alias: 'fg',
    countdown : 64,
    role: 0,
    category: 'game',
    en: {
      invalid_amount: 'Invalid amount.',
      not_enough_money: 'Not enough money. Fish within your budget.',
      minimum_balance_required: 'You need at least 1000 balance to go fishing.'
    }
  },
  onStart: async function ({ args, message, event, usersData, prefix }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Invalid amount. Please use ' + prefix + 'fish | 1000');
    }

    if (amount > userData.money) {
      return message.reply('Not enough money. Fish within your budget.');
    }

    userData.money -= amount;
    await usersData.set(senderID, userData);

    async function goFishing(userId) {
      const user = (await usersData.get(userId)) || {};
      let userBalance = user.money || 0;

      const fishCaught = Math.random() < 0.64;

      if (fishCaught) {
        const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
        const fishValue = randomFish.price * amount;

        userBalance += fishValue;

        user.money = userBalance;
        await usersData.set(userId, user);

        const replyMessage = `Selamat! 🎉\nKamu Menangkap «${randomFish.name}»\nSenilai ${fishValue}$.\nTotal Euro Kamu Sekarang: ${userBalance}💰`;
        return message.reply(replyMessage);
      } else {
        const replyMessage = 'You suck you don\t get any fish🥺🦔';
        return message.reply(replyMessage);
      }
    }

    await goFishing(senderID);
  },
};