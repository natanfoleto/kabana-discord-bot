const Discord = require("discord.js")

module.exports = {
    name: "limpar",
    description: "Limpe o canal de texto",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Insira um número de mensagens para serem excluidas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `❌ | Você não tem permissão para utilizar este comando.`, ephemeral: true })
        } else {
            if (parseInt(numero) > 1000 || parseInt(numero) <= 0) {
                interaction.reply({ content: `❌ | Insira um número de mensagens para serem apagadas! Lembrando que tem que ser um número de \`1 á 1000\``, ephemeral: true})
            } else {
                interaction.channel.bulkDelete(parseInt(numero))

                interaction.reply(`**Chat limpo com sucesso!!!**\n\n♻ **| Faxineiro:** ${interaction.user}\n\n🧹 **| Mensagens Limpas:** \`${numero}\``)

                let apagar_mensagem = "nao" // sim ou nao

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }
            }
        }
    }
}