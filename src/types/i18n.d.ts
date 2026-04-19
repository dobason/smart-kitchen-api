import type en from "../languages/en.json";

declare module "@intlify/elysia" {
  export interface DefineLocaleMessage extends typeof en {}
}
