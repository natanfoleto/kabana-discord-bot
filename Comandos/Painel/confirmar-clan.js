const Discord = require("discord.js")

module.exports = {
  name: "confirmar-clan",
  description: "Ative o sistema de confirmação de clans no canal mencionado!",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Mencione um canal de texto.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: false,
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
      interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
      let canal = interaction.options.getChannel("canal");
      if (!canal) canal = interaction.channel;

      let embedMention = new Discord.EmbedBuilder()
        .setColor("#313236")
        .setDescription(`Olá ${interaction.user}, o sistema foi adicionado em ${canal} com sucesso.`);

      let embedClan = new Discord.EmbedBuilder()
        .setColor("#313236")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription('**CONFIRME SEU CLAN!** \n Olá você gostaria de confirmar seu clan? **Basta clicar no botão abaixo!** ')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

      let button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("clanModal")
          .setLabel("Confirmar Clan")
          .setStyle(Discord.ButtonStyle.Secondary)
      );

      interaction.reply({ embeds: [embedMention], ephemeral: true }).then(() => {
        canal.send({ embeds: [embedClan], components: [button] })
      })
    }
  }
}