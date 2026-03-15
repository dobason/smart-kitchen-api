import { detectLocaleFromAcceptLanguageHeader, intlify } from "@intlify/elysia";

const en = await Bun.file(`${import.meta.dir}/../languages/en.json`).json();
const vi = await Bun.file(`${import.meta.dir}/../languages/vi.json`).json();

const messages: Record<string, Record<string, unknown>> = { en, vi };

export const i18n = () =>
  intlify({
    locale: detectLocaleFromAcceptLanguageHeader,
    messages,
  });

// Standalone translate — resolves dot-notation keys like "errors.system"
export const t = (key: string, locale: string = "vi"): string => {
  const dict = messages[locale] ?? messages["en"];
  const value = key.split(".").reduce<unknown>((obj, k) => {
    if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[k];
    return undefined;
  }, dict);
  return typeof value === "string" ? value : key;
};
