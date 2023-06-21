import { ApplicationCommandDataResolvable } from "discord.js";

interface RegisterCommandsOptions {
  guildId: string;
  commands: ApplicationCommandDataResolvable[];
}

export { RegisterCommandsOptions };
