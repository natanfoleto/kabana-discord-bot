import {
  CacheType,
  EmbedBuilder,
  ButtonInteraction,
  TextChannel,
} from "discord.js";

import Bot from "../../client";

export async function verify(
  client: Bot,
  interaction: ButtonInteraction<CacheType>
) {
  const { guild, user } = interaction;
  const memberRole = process.env.MEMBER_ROLE;

  await guild?.members
    .addRole({
      user,
      role: memberRole,
    })
    .then(async () => {
      const defaultRole = process.env.DEFAULT_ROLE;

      await guild?.members.removeRole({
        user,
        role: defaultRole,
      });
    });

  const embedVerified = new EmbedBuilder()
    .setDescription(`**Você foi verificado com o cargo <@&${memberRole}>!**`)
    .setColor("Green");

  await interaction.reply({
    embeds: [embedVerified],
    ephemeral: true,
  });

  const embedVerifiedLog = new EmbedBuilder()
    .setTitle(
      `Um novo usuário foi verificado\n\nEste usúario é o ${interaction.guild?.memberCount}º membro a ser verificado no nosso servidor`
    )
    .setThumbnail(client.user?.displayAvatarURL() || null)
    .setColor("#313236")
    .addFields({
      name: "```Usuário```",
      value: `${interaction.user}`,
      inline: false,
    })
    .setTimestamp();

  const channel = client.channels.cache.find(
    (ch) => ch.id === process.env.VERIFIED_MEMBER_LOG_CHANNEL
  );

  if (channel?.isTextBased()) {
    await (<TextChannel>channel).send({
      embeds: [embedVerifiedLog],
    });
  }
}
