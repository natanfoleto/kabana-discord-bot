import { EmbedBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "verificar",
  description: "Sistema de verificação.",
  testOnly: false,
  run: async ({ client, interaction }) => {
    const memberRole = process.env.MEMBER_ROLE;

    if (interaction.member.roles.highest.id === memberRole) {
      const embedAlreadyVerified = new EmbedBuilder()
        .setDescription(`Você já foi verificado com o cargo <@&${memberRole}>`)
        .setColor("Red");

      await interaction
        .reply({ embeds: [embedAlreadyVerified], ephemeral: true })
        .then((reply) => {
          setTimeout(() => {
            reply.delete();
          }, 5000);
        });

      return;
    }

    const button = new ButtonBuilder()
      .setCustomId("verify")
      .setLabel(`Verificar`)
      .setEmoji("<:confirmar:1054522311551758376>")
      .setStyle(ButtonStyle.Success);

    const embed = new EmbedBuilder()
      .setTitle("Bem-vindo")
      .setDescription(
        `
          Bem-vindo ao servidor, clique no botão e verifique-se para ganhar acesso!
          
          Ao clicar em verificar, você concorda com os termos e regras.
          <#1071905656266817617>
        `
      )
      .setColor("Green")
      .setThumbnail(client.user?.displayAvatarURL() || null);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      components: [
        {
          type: 1,
          components: [button],
        },
      ],
    });
  },
};
