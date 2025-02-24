const fs = require('fs');
const {Client, Events, GatewayIntentBits} = require('discord.js');
const TRACK_VOICE_CHANNELS = [
    "1194078366039552005", 
    "1194078366039552006", 
    "1303340025424904193",
    "1239601142120448056"
]; // IDs de los canales de voz a monitorear
const SERVER_TEXT_CHANNELS = {
    "1194078366039552000": "1343452131298115604", //Macacos cachondos
    "1239601142120448052": "1239601142120448055" //Thomixp server
}; // Mapeo de servidores a canales de texto
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
}); 
const tokenData = JSON.parse(fs.readFileSync('../token.json', 'utf8'));
const token = tokenData.PastafrolaToken;


client.on(Events.ClientReady, async () => {
    console.log(`Conectado como ${client.user.username}!`);
});



client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('-')) return;

    const args = message.content.slice(1).split(' ')[0];

    try {
        const command = require(`./commands/${args}`);
        command.run(message);
        
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar -${args}`, error.message); 
    }
});




client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelID = '1303389292399296592';
    const channel = await client.channels.fetch(welcomeChannelID);
    channel.send(`**✨ <@${member.user.id}> bienvenido a la comunidad!**`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
    if (oldState.channel && !newState.channel && TRACK_VOICE_CHANNELS.includes(oldState.channel.id)) {
        const guildId = oldState.guild.id;
        const textChannelId = SERVER_TEXT_CHANNELS[guildId];
        const textChannel = client.channels.cache.get(textChannelId);
        
        if (textChannel) {
            const voiceChannel = oldState.channel;
            if (voiceChannel.members.size === 0) {
                textChannel.send(obtenerTextoAleatorio(oldState.member, voiceChannel));
            } else {
                //textChannel.send(`${oldState.member.displayName} se ha desconectado del canal de voz ${voiceChannel.name}.`);
            }
        }
    }
});
function obtenerTextoAleatorio(miembro, voiceChannel) {
    const textos = [
        { texto: `<@${miembro.id}> fue el ultimo en irse de ${voiceChannel}, jaja alto trolo 😜🤑🥵🥵`, probabilidad: 0.8 },
        { texto: `<@${miembro.id}> fue el ultimo en irse de ${voiceChannel}, Alto tontorron, le meteria el pene 😂😂😁`, probabilidad: 0.4 },
        { texto: `<@${miembro.id}> fue el ultimo en irse de ${voiceChannel}, bro literalmente se cree gay`, probabilidad: 0.5 },
        { texto: `<@${miembro.id}> fue el ultimo en irse de ${voiceChannel}, Que insano SHINY BRO YOU KNOW?¿ 🙄🙄😏`, probabilidad: 0.1 },
        { texto: `Bro literalmente <@${miembro.id}> se salvo ya que este mensaje es imposible que salga`, probabilidad: 0.01 }
    ];
  
    const totalProbabilidad = textos.reduce((sum, item) => sum + item.probabilidad, 0);
    const numeroAleatorio = Math.random() * totalProbabilidad;
    let sumaProbabilidades = 0;
  
    for (const item of textos) {
      sumaProbabilidades += item.probabilidad;
      if (numeroAleatorio <= sumaProbabilidades) {
        return item.texto;
      }
    }
  }
  
  

//Ultimo mensaje para que se conecte el bot
client.login(token);
