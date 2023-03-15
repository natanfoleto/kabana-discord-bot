const Discord = require('discord.js');

module.exports = {
    name: "banir",
    description: "Bane um usuário do discord",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Selecione um usuário',
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name: 'reason',
            description: 'Diga o motivo para banir o usuário',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `<:xx:1035315658814132345> | Olá ${interaction.user}, você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            const user = interaction.options.getUser("user")
            const userCache = interaction.guild.members.cache.get(user.id)
            const reason = interaction.options.getString("reason") || "Motivo não falado."

            if (!user || !userCache) return interaction.reply({ content: 'Usuário não encontrado', ephemeral: true })

            let embedSuccess = new Discord.EmbedBuilder()
                .setColor("#9B111E")
                .setDescription(`
                    **O usuário ${user} (\`${interaction.user.id}\`) foi banido.**

                    **Motivo** 
                    ${reason}
                `)
                .setFooter({
                    text: `Banido por: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ format: "png" })
                });

            let embedError = new Discord.EmbedBuilder()
                .setColor("#9B111E")
                .setDescription(`
                    **Houve um erro ao processar a solicitação.**

                    **Possíveis causas**

                    Tentou banir alguém da staff.
                    Usuário ou ID de usuário está inválido.
                    Usuário não está no servidor.
                    Usuário já foi banido.
                    Outros.
                `)

            userCache.ban({ reason: [reason] })
                .then(() => { interaction.reply({ embeds: [embedSuccess] }) })
                .catch(() => { interaction.reply({ embeds: [embedError] }) })
        }
    }
}


