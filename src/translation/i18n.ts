import { pluralizeForRussian } from "./pluralization";
import { locales } from "./locales";
import { I18n } from "i18n-js";

export const FALLBACK_LANGUAGE = {
  isRTL: false,
  languageTag: "en",
};

export enum LanguageTags {
  en = "en",
  ru = "ru",
}

function getI18n() {
  const languageTag =
    Object.keys(LanguageTags).find((a) => a === navigator.language) ||
    FALLBACK_LANGUAGE.languageTag;

  const i18n = new I18n(locales);

  i18n.locale = languageTag;
  i18n.enableFallback = true;

  i18n.pluralization.register("ru", pluralizeForRussian);

  return i18n;
}

export const i18n = getI18n();
