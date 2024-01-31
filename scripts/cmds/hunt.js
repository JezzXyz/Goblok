  const animalList = [
  { name: 'Lion 🦁', price: 99999910 },
  { name: 'Tiger 🐅', price: 141 },
  { name: 'Bear 🐻', price: 121 },
  { name: 'Cheetah 🐆', price: 123 },
  { name: 'Wolf 🐺', price: 144 },
  { name: 'Fox 🦊', price: 135 },
  { name: 'Panther 🐆', price: 163 },
  { name: 'monkey 🐒', price: 210 },
  { name: 'Eagle 🦅', price: 89 },
  { name: 'Giraffe 🦒', price: 215 }
];

module.exports = {
  config: {
    name: 'hunt',
    version: '1.0',
    author: 'loufi libra🦔',
    alias: 'fg',
    countdown : 4,
    role: 0,
    category: 'game',
    en: {
      invalid_amount: 'Invalid amount.',
      not_enough_money: 'Not enough money. animal within your budget.',
      minimum_balance_required: 'You need at least 1000 balance to go hunting.'
    }
  },
  onStart: async function ({ args, message, event, usersData, prefix }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Invalid amount. Please use ' + prefix + 'animal | 1000');
    }

    if (amount > userData.money) {
      return message.reply('Not enough money. animal within your budget.');
    }

    userData.money -= amount;
    await usersData.set(senderID, userData);

    async function goanimaling(userId) {
      const user = (await usersData.get(userId)) || {};
      let userBalance = user.money || 0;

      const animalCaught = Math.random() < 0.80;

      if (animalCaught) {
        const randomAnimal = animalList[Math.floor(Math.random() * animalList.length)];
        const animalValue = randomAnimal.price * amount;

        userBalance += animalValue;

        user.money = userBalance;
        await usersData.set(userId, user);

        const replyMessage = `Selamat! 🎉\nKamu Menangkap «${randomAnimal.name}»\nSenilai ${animalValue}$.\nTotal Euro Kamu Sekarang: ${userBalance}💰`;
        return message.reply(replyMessage);
      } else {
        const replyMessage = 'Maaf, kamu tidak dapat menangkap hewan liar kali ini. 🦔';
        return message.reply(replyMessage);
      }
    }

    await goanimaling(senderID);
  },
};