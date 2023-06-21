import { CacheType, EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export async function announcement(
  interaction: ModalSubmitInteraction<CacheType>
) {
  const title = interaction.fields.getTextInputValue("title");
  const description = interaction.fields.getTextInputValue("description");

  const embed = new EmbedBuilder()
    .setColor("#F1C21E")
    .setAuthor({
      name: `Anúncios - KabanaMC`,
      iconURL: "https://i.imgur.com/1eyPLUv.png",
    })
    .setDescription(
      `
        >>> **${title}** 
        ${description}
        
        Postado por **${interaction.user.username}**
      `
    )
    .setThumbnail(interaction.user?.displayAvatarURL())
    .setFooter({
      text: `\n© Todos os direitos reservados`,
    });

  await interaction.reply({ embeds: [embed] });
}
