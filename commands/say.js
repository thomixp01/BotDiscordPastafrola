module.exports = {
    description: 'Repito lo que dices',
    run: async (message) => {
        const args = message.content.split(' ').slice(1).join(' ');

         if (args.length < 1) return message.reply('Por favor, escribe algo para repetir.');

         message.reply(args);

    }
}