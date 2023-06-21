import { EmbedBuilder } from "discord.js";

import { Command } from "../../../interfaces";

const embedDescription = `
> IP de conexão: **kabana-mc.net**
> Loja: [Clique aqui](https://kabana-mc.net/)
> Versão: **1.8x**
`;

export const slash: Command = {
  name: "ip",
  description: "Mostra as informações do servidor.",
  testOnly: false,
  run: ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setColor("#313236")
      .setTitle(`${interaction.guild?.name}`)
      .setDescription(embedDescription)
      .setImage("attachment://banner.png");

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
      files: [
        {
          attachment:
            "http://status.mclive.eu/kabana-mc.net/kabana-mc.net/banner.png",
          name: "banner.png",
        },
      ],
    });
  },
};
