import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  PermissionFlagsBits,
} from "discord.js";

import fs from "fs";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "ajuda",
  description: "Lista os comandos do servidor.",
  testOnly: false,
  run: ({ client, interaction }) => {
    const options = [];

    const categories = fs.readdirSync("src/interactions/commands");

    for (const category of categories) {
      const categoryWithCapitalLetter =
        category.charAt(0).toUpperCase() + category.substring(1);

      if (categoryWithCapitalLetter === "Staff") {
        if (
          !interaction.member.permissions.has(
            PermissionFlagsBits.ManageMessages
          )
        )
          continue;
      }

      options.push({
        label: `${categoryWithCapitalLetter}`,
        description: `Veja os comandos de ${categoryWithCapitalLetter}`,
        value: `${category}`,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Comandos do Servidor")
      .setColor("#313236")
      .setDescription("Selecione uma categoria de comandos");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("help")
      .addOptions(options);

    interaction
      .reply({
        embeds: [embed],
        ephemeral: true,
        components: [
          {
            type: 1,
            components: [menu.toJSON()],
          },
        ],
      })
      .then(async (msg) => {
        const filter = (m: any) => m.user.id == interaction.user.id;

        const collector = msg.createMessageComponentCollector({
          filter,
          time: 60000,
        });

        collector.on("collect", async (i: StringSelectMenuInteraction) => {
          i.deferUpdate();

          const commands = [];

          const selected = i.values[0];
          const files = fs.readdirSync(`src/interactions/commands/${selected}`);

          for (const command of files) {
            if (command.endsWith(".ts")) {
              commands.push(command.replace(/.ts/g, ""));
            }
          }

          const categoryWithCapitalLetter =
            selected.charAt(0).toUpperCase() + selected.substring(1);

          embed.setDescription(
            `Você está vendo os comandos da categoria ${categoryWithCapitalLetter}`
          );
          embed.setFields([
            {
              name: "/comando",
              value: `\`\`\`${commands.join(", ")}\`\`\``,
            },
          ]);

          // Necessita do editReply, pois a cada categoria escolhida a resposta é editada
          interaction.editReply({ embeds: [embed] });
        });
      });
  },
};
