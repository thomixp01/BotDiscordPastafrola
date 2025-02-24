
const {User, EmbedBuilder} = require('discord.js')

module.exports = {
    description: 'Muestra tu avatar',
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        if(!member) return message.reply("Introduce un usuario valido")
        
        const avatar = member.user.displayAvatarURL({size: 512})

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('✨ Avatar de '+ member.user.username)
            .setImage(avatar) 
        

            message.reply({embeds: [embed]})


    }
}