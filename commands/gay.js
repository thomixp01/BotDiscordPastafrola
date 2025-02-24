const {User, EmbedBuilder} = require('discord.js')
const path = require('path');
const fs = require('fs');

const dataFolder = path.join(__dirname, 'Data');
const dataFile = path.join(dataFolder, 'storage.json');


module.exports = {
    description: 'Contador de gay',
    run: async (message) => {
        const args = message.content.split(' ').slice(1).join(' ');

         if (args.length < 1) return message.reply('Por favor, menciona a alguien.');
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        if(!member) return message.reply("Introduce un usuario valido")
        if (member.user.username == "elcejotas3") {
            message.reply("Pizza es demasiado gay como para usar este comando");
            return;
        }
        function loadData() {
            try {
                if (!fs.existsSync(dataFile)) {
                    return {}; // Si el archivo no existe, devolvemos un objeto vacío
                }
        
                const rawData = fs.readFileSync(dataFile, 'utf8').trim();
                return rawData ? JSON.parse(rawData) : {}; // Si el archivo está vacío, devolvemos un objeto vacío
            } catch (error) {
                console.error('Error al leer el archivo JSON:', error);
                return {}; // En caso de error, devolvemos un objeto vacío
            }
        }
        
        function saveData(data) {
            if (!fs.existsSync(dataFolder)) {
                fs.mkdirSync(dataFolder, { recursive: true });
            }
        
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
        }
        
        function addOrUpdateName(nombre) {
            let data = loadData(); // Cargar datos existentes
        
            if (!data[nombre]) {
                data[nombre] = 1; // Si el nombre no existe, empieza en 1
            } else {
                data[nombre] += 1; // Si ya existe, se incrementa el contador
            }
        
            saveData(data); // Guardamos los cambios
            console.log(`Se ha actualizado "${nombre}", ahora tiene un contador de: ${data[nombre]}`);
        }
        
        // Ejemplo de uso
        const nombreIngresado = process.argv[2] || member.user.username; // Se puede ingresar desde la terminal
        addOrUpdateName(nombreIngresado);

        let data = loadData();
        message.reply("El gay de "+member.user.username+" va "+data[member.user.username]+" veces siendo gay. que gay! 🔥");


    }
}