/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    PREFIX: string;
    TIME_STATUS: string;
    DEFAULT_ROLE: string;
    MEMBER_ROLE: string;
    VERIFIED_MEMBER_LOG_CHANNEL: string;
    SUGGESTION_LOG_CHANNEL: string;
    TESTSERVER: string;
    DISABLED_COMMANDS: string;
    DISABLED_EVENTS: string;
    FILE_EXTENSION: string;
  }
}
