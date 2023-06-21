import { Interaction, CommandInteractionOptionResolver } from "discord.js";

import { Event } from "../interfaces";
import { ExtendedInteraction } from "../interfaces/command";

import { announcement } from "../interactions/modals/announcement";
import { verify } from "../interactions/buttons/verify";
import { maintenance } from "../interactions/modals/maintenance";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction: Interaction) => {
    if (interaction.isCommand()) {
      // await interaction.deferReply();

      const command = client.commands.get(interaction.commandName);

      if (!command) return interaction.reply("Command not exists.");

      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
      });
    }

    if (interaction.isButton()) {
      const { customId } = interaction;

      switch (customId) {
        case "verify":
          verify(client, interaction);
          break;

        default:
          interaction.reply({ content: "Serviço indisponível no momento." });
          break;
      }
    }

    if (interaction.isModalSubmit()) {
      const { customId } = interaction;

      switch (customId) {
        case "announcement":
          announcement(interaction);
          break;
        case "maintenance":
          maintenance(interaction);
          break;

        default:
          interaction.reply({ content: "Serviço indisponível no momento." });
          break;
      }
    }
  },
};
