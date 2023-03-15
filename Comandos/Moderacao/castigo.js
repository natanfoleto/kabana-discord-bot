const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name: 'castigo',
    description: 'Coloque um usuário de castigo.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Selecione um usuário.',
            required: true,
        },
        {
            name: 'time',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Selecione um tempo para colocar o usuário de castigo.',
            required: true,
            choices: [
                {
                    name: '30 Segundos',
                    value: '30s',
                },
                {
                    name: '1 Minuto',
                    value: '1m',
                },
                {
                    name: '5 Minutos',
                    value: '5m',
                },
                {
                    name: '10 Minutos',
                    value: '10m',
                },
                {
                    name: '15 Minutos',
                    value: '15m',
                },
                {
                    name: '30 Minutos',
                    value: '30m',
                },
                {
                    name: '45 Minutos',
                    value: '45m',
                },
                {
                    name: '1 Hora',
                    value: '1h',
                },
                {
                    name: '2 Horas',
                    value: '1h',
                },
                {
                    name: '5 Horas',
                    value: '1h',
                },
                {
                    name: '12 Horas',
                    value: '12h',
                },
                {
                    name: '24 Horas',
                    value: '24h',
                },
                {
                    name: '1 Dia',
                    value: '24h',
                },
                {
                    name: '3 dias',
                    value: '72h',
                },
                {
                    name: '1 Semana',
                    value: '168h',
                },
            ]
        },
        {
            name: 'reason',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Diga o motivo para castigar o usuário',
            required: false,
        },
    ],

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: `Você não possui permissão para utilizar esse comando.`,
                ephemeral: true,
            })

        } else {
            const user = interaction.options.getUser("user")
            const userCache = interaction.guild.members.cache.get(user.id);
            const time = interaction.options.getString("time")
            const reason = interaction.options.getString("reason") || "Motivo não falado."
            const duration = ms(time);

            if (!user || !userCache) return interaction.reply({ content: 'Usuário não encontrado', ephemeral: true })

            const embedSuccess = new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`
                    **O usuário ${user} (\`${interaction.user.id}\`) foi castigado.
                    
                    **Motivo** 
                    ${reason} 
                    
                    **Duração do castigo**
                    ${time}
                `)
                .setFooter({ text: `Castigado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });

            const embedError = new Discord.EmbedBuilder()
                .setColor("#9B111E")
                .setDescription(`
                    **Houve um erro ao processar a solicitação.**

                    **Possíveis causas**

                    Tentou castigar alguém da staff.
                    Usuário ou ID de usuário está inválido.
                    Usuário não está no servidor.
                    Usuário já foi castigado.
                    Outros.
                `)

            userCache.timeout(duration, reason)
                .then(() => { interaction.reply({ embeds: [embedSuccess] }) })
                .catch(() => { interaction.reply({ embeds: [embedError] }) })
        }
    }
}