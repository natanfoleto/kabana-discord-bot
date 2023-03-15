const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "slowmode",
    description: "Configure o modo lento em um canal de texto.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "time",
            description: "Coloque o tempo do modo lento [s|m|h].",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "channel",
            description: "Mencione um canal de texto.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: 'Você não tem permissão para utilizar este comando.', ephemeral: true })
        } else {
            const time = ms(interaction.options.getString("time"));

            const channel = interaction.options.getChannel("channel");

            if (!channel || channel === null) channel = interaction.channel;

            if (!time || time === false || time === null) {
                interaction.reply({ content: `Forneça um tempo válido: [s|m|h].`, ephemeral: true })
            } else {
                channel.setRateLimitPerUser(time / 1000)
                    .then(() => {
                        interaction.reply({ content: `O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.` })
                    })
                    .catch(() => {
                        interaction.reply({ content: 'Ops, algo deu errado ao executar este comando.', ephemeral: true })
                    })
            }
        }
    }
}