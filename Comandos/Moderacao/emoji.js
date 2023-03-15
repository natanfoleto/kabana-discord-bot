const Discord = require("discord.js")

module.exports = {
    name: "emoji",
    description: "[❓] Veja as informações de um emoji.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "emoji",
            description: "Insira o nome exato do emoji.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        const name = interaction.options.getString("emoji")

        const emoji =
            client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === name) ||
            client.emojis.cache.find(emoji => emoji.name === name) ||
            client.emojis.cache.get(name);

        if (!emoji) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`**❌ - Não encontrei o emoji, siga o modelo abaixo**\n\`/emoji [nome]\``)
                ]
            });
        } else if (emoji) {
            try {
                if (!emoji.animated) {
                    const img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;

                    const btn = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(Discord.ButtonStyle.Link)
                                .setLabel("Download")
                                .setEmoji("📎")
                                .setURL(img)
                        );

                    const embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(`${img}`)
                        .setDescription(`
                            Nome do emoji: \`${emoji.name}\`
                            ID do emoji: \`${emoji.id}\`
                            Menção do emoji: \`${emoji}\`
                            O emoji é: \`Imagem (png/jpg)\`
                            Criado em: <t:${parseInt(emoji.createdTimestamp / 1000)}>
                    `)

                    interaction.reply({ embeds: [embed], components: [btn] })
                } else if (emoji.animated) {
                    const img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;

                    const btn = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(Discord.ButtonStyle.Link)
                                .setLabel("Download")
                                .setEmoji("📎")
                                .setURL(`${img}`)
                        );

                    const embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(img)
                        .setDescription(`
                            Nome do emoji: \`${emoji.name}\`
                            ID do emoji: \`${emoji.id}\`
                            Menção do emoji: \`${emoji}\`
                            O emoji é: \`Gif\`
                            Criado em: <t:${parseInt(emoji.createdTimestamp / 1000)}>
                        `)

                    await interaction.reply({ embeds: [embed], components: [btn] })
                }
            } catch (e) {
                interaction.reply(`Houve um erro ao tentar utilizar esse comando, ${interaction.user}`)
            }
        }
    }
}