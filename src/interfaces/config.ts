/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    PREFIX: string;
    TIME_STATUS: string;

    DEFAULT_ROLE: string;
    MEMBER_ROLE: string;
    STAFF_ROLE: string;
    SUPPORT_ROLE: string;

    TICKET_CATEGORY: string;

    VERIFIED_MEMBER_LOG_CHANNEL: string;
    TICKET_PIN_CHANNEL: string;
    TICKET_LOG_CHANNEL: string;
    SUGGESTION_LOG_CHANNEL: string;
    ANNOUUNCEMENT_LOG_CHANNEL: string;
    JOIN_LOG_CHANNEL: string;
    QUIT_LOG_CHANNEL: string;

    TESTSERVER: string;
    DISABLED_COMMANDS: string;
    DISABLED_EVENTS: string;
    FILE_EXTENSION: string;
  }
}
