const Discord = require("discord.js")

module.exports = {
    name: "limpar",
    description: "Limpe um canal de texto",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'amount',
            description: 'Insira um número de mensagens para serem excluidas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        const amount = interaction.options.getNumber('amount')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `❌ | Você não tem permissão para utilizar este comando.`, ephemeral: true })
        } else {
            if (parseInt(amount) > 1000 || parseInt(amount) <= 0) {
                interaction.reply({ content: `❌ | Insira um número de mensagens para serem apagadas! Lembrando que tem que ser um número de \`1 a 1000\``, ephemeral: true })
            } else {
                interaction.channel.bulkDelete(parseInt(amount))

                interaction.reply(`**Chat limpo com sucesso!!!**\n\n♻ **| Faxineiro:** ${interaction.user}\n🧹 **| Mensagens Limpas:** \`${amount}\``)

                const deleteMessage = false

                if (deleteMessage)
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                else if (!deleteMessage) return
            }
        }
    }
}