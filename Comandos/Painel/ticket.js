const Discord = require("discord.js");

module.exports = {
    name: 'ticket',
    description: "Envie o painel-ticket.",
    options: [
        {
            name: 'canal',
            description: 'Canal onde o painel-ticket será enviado.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ content: `Opa ${interaction.user}, você não possui permissão para utilizar este comando!`, ephemeral: true })

        else {

            let canal = interaction.options.getChannel('canal')
            let embed = new Discord.EmbedBuilder()
                .setDescription(`Nossa equipe está sempre disposta a te ajudar em qualquer problema. \n  \n > Para receber atendimento, basta selecionar a \n > categoria de acordo com a sua necessidade de suporte. \n  \n ⏰ **Horário de atendimento:**ﾠﾠﾠﾠﾠ🌎 **Site:** \n Seg. á Sex. 12h ás 18h30ﾠﾠﾠﾠﾠﾠﾠ ㅤﾠ[Clique Aqui](https://elgaenetwork.com/loja/)`)
                .setAuthor({ name: 'Sistema de atendimento - KabanaMC', iconURL: 'https://i.imgur.com/Cl6NXLV.png' })
                .setColor("#313236")
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

            let button = new Discord.StringSelectMenuBuilder()
                .setCustomId('Select')
                .setPlaceholder('Selecione uma categoria')
                .addOptions([
                    {
                        label: `Compras`,
                        description: 'Abra um ticket para reportar bugs.',
                        emoji: '<:esmeralda:1054523241177301073>',
                        value: 'op3'
                    },
                    {
                        label: `Denúncias`,
                        description: 'Abra um ticket para esclarecer suas dúvidas.',
                        emoji: '<:barreira:1054522298121601214>',
                        value: 'op1'
                    },
                    {
                        label: `Dúvidas`,
                        description: 'Outros assuntos pertinentes...',
                        emoji: '<:chat:1062862194666119229>',
                        value: 'op2'
                    }
                ])

            const row = new Discord.ActionRowBuilder().addComponents(button)

            canal.send({ embeds: [embed], components: [row] })
            interaction.reply({ content: `Painel-ticket enviado para ${canal} com sucesso!`, ephemeral: true })
        }
    }
}