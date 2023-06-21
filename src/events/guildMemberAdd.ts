import { Interaction } from "discord.js";

import { Event } from "../interfaces";

export const event: Event = {
  name: "guildMemberAdd",
  run: (client, interaction: Interaction) => {
    const { guild, user } = interaction;

    const defaultRole = guild?.roles.cache.get(`${process.env.DEFAULT_ROLE}`);

    if (!defaultRole)
      return console.log("O cargo de auto-role, não está configurado.");

    guild?.members
      .addRole({
        user,
        role: defaultRole,
      })
      .catch((err) => console.log(err));
  },
};
