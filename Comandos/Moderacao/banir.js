const Discord = require('discord.js');

module.exports = {
    name: "banir",
    description: "Bane um usuario do discord",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Selecione um usuario',
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name: 'motivo',
            description: 'Defina um motivo para banir o usuario',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `<:xx:1035315658814132345> | Ola ${interaction.user}, Você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            let user = interaction.options.getUser("user")
            let user2 = interaction.guild.members.cache.get(user.id)
            let motivo = interaction.options.getString("motivo")
            if (!motivo) motivo = "Não definido"
            if (!user) return interaction.reply({ content: 'Insira um id ou usuário válido', ephemeral: true })


            let ryan = new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`
            **O usuario ${user} (\`${interaction.user.id}\`) foi banido pelo motivo \`${motivo}\` com sucesso!**`)
                .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });

            user2.ban({ reason: [motivo] }).then(() => {

                interaction.reply({ embeds: [ryan] })
            })


        }
    }
}


