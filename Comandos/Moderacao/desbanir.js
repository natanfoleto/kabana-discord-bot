const Discord = require('discord.js');

module.exports = {
    name: "desbanir",
    description: "Retire a punição de algum usuário do servidor",
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
            description: 'Diga o motivo para desbanir o usuário',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `<:xx:1035315658814132345> | Olá ${interaction.user}, você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            const user = interaction.options.getUser("user")
            const reason = interaction.options.getString("reason") || "Motivo não falado."

            if (!user) return interaction.reply({ content: 'Usuário não encontrado', ephemeral: true })

            let embedSuccess = new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`
                    **O usuário ${user} (\`${interaction.user.id}\` foi desbanido do servidor.**
                    
                    **Motivo**
                    ${reason}
                `)
                .setFooter({ text: `Desbanido por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });

            let embedError = new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`
                    **Houve um erro ao processar a solicitação.**

                    **Possíveis causas**

                    Tentou desbanir alguém da staff.
                    Usuário ou ID de usuário está inválido.
                    Usuário não está no servidor.
                    Usuário não está banido.
                    Outros.
                `)

            interaction.guild.members.unban(user, reason)
                .then(() => { interaction.reply({ embeds: [embedSuccess] }) })
                .catch(() => { interaction.reply({ embeds: [embedError] }) })
        }
    }
}
