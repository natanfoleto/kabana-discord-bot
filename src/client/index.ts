import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
  Partials,
} from "discord.js";

import path from "path";
import { readdirSync } from "fs";

import dotenv from "dotenv";

import { Command, Event, RegisterCommandsOptions } from "../interfaces";

dotenv.config();

class Bot extends Client {
  public config = process.env;
  public events: Collection<string, Event> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, Command> = new Collection();

  private index = 0;
  private status = [
    "• Meus comandos são em slash {/}",
    "• Sou o bot oficial deste servidor!",
    "• IP ⇒ jogar.kabana-mc.net",
    "• Loja ⇒ kabana-mc.net",
    "• Olá seja bem vindo a KabanaMC!",
  ];

  public constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildWebhooks",
        "MessageContent",
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
        Partials.Message,
      ],
    });
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.slash;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
    } else {
      this.application?.commands.set(commands);
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];

    const commandPath = path.join(__dirname, "..", "interactions", "commands");

    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(
          process.env.FILE_EXTENSION ? process.env.FILE_EXTENSION.trim() : ".js"
        )
      );

      commands.forEach(async (file) => {
        const command: Command = await this.importFile(
          `${commandPath}/${dir}/${file}`
        );

        const disableCommands = JSON.parse(
          process.env.DISABLED_COMMANDS
        ) as string[];

        if (disableCommands.includes(command.name)) return;

        console.log(`➤  ${command.name} registrado com sucesso 🟢`);

        if (!command.name) return;

        this.commands.set(command.name, command);
        slashCommands.push(command);
      });
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: `${this.config.TESTSERVER}`,
      });
    });
  }

  public async init() {
    console.log("➤  Inicializando Kabana BOT ⏳");

    this.login(this.config.TOKEN);
    this.registerModules();

    setInterval(() => {
      this.user?.setActivity(
        `${this.status[this.index++ % this.status.length]}`,
        {}
      );
    }, 1000 * Number(process.env.TIME_STATUS));

    if (!this.config.TESTSERVER)
      console.log("➤  O servidor de testes não foi configurado 🔴");

    const eventPath = path.join(__dirname, "..", "events");

    readdirSync(eventPath).forEach(async (file) => {
      if (
        !file.endsWith(
          process.env.FILE_EXTENSION ? process.env.FILE_EXTENSION.trim() : ".js"
        )
      )
        return;

      const { event } = await import(`${eventPath}/${file}`);

      const disableEvents = JSON.parse(process.env.DISABLED_EVENTS) as string[];

      if (disableEvents.includes(event.name)) return;

      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));

      console.log(`➤  ${event.name} iniciado com sucesso 🟠`);
    });
  }
}

export default Bot;
