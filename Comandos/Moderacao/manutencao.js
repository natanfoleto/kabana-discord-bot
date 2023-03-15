const Discord = require("discord.js")

module.exports = {
    name: "manutencao",
    description: "Anuncie algo em um canal. ",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "servidor",
            description: "Em qual servidor?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "título",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "descrição",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "tempo",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "cor",
            description: "Coloque uma cor em hexadecimal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            const server = interaction.options.getString("servidor")
            const title = interaction.options.getString("título")
            const description = interaction.options.getString("descrição")
            const time = interaction.options.getString("tempo")

            let cor = interaction.options.getString("cor")
            if (!cor) cor = "#313236"

            const chat = interaction.options.getChannel("chat")
            if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`)

            const embed = new Discord.EmbedBuilder()
                .setTitle(`Um servidor entrou em manutenção!\n`)
                .setDescription(`
                ${title}
                ${description}
                
                Servidor: ${server}
                Tempo estimado: ${time}
            `)
                .setColor(cor);

            chat.send({ embeds: [embed] }).then(() => {
                interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
            }).catch((e) => {
                interaction.reply(`❌ Algo deu errado.`)
            })
        }
    }
}