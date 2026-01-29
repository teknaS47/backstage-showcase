import frRhdh from "../../../../translations/rhdh-reference-2025-12-05-fr-C.json" with { type: "json" };
import frCommunityPlugins from "../../../../translations/community-plugins-reference-2025-12-05-fr-C.json" with { type: "json" };
import frRhdhPlugins from "../../../../translations/rhdh-plugins-reference-2025-12-05-fr-C.json" with { type: "json" };
import frMissingTranslations from "../../../../translations/test/missing-fr-translations.json" with { type: "json" };

import itRhdh from "../../../../translations/rhdh-reference-2025-12-05-it-C.json" with { type: "json" };
import itCommunityPlugins from "../../../../translations/community-plugins-reference-2025-12-05-it-C.json" with { type: "json" };
import itRhdhPlugins from "../../../../translations/rhdh-plugins-reference-2025-12-05-it-C.json" with { type: "json" };

import jaRhdh from "../../../../translations/rhdh-reference-2025-12-05-ja-C.json" with { type: "json" };
import jaCommunityPlugins from "../../../../translations/community-plugins-reference-2025-12-05-ja-C.json" with { type: "json" };
import jaRhdhPlugins from "../../../../translations/rhdh-plugins-reference-2025-12-05-ja-C.json" with { type: "json" };

import en from "../../../../translations/test/all-v1.8_s3281-en.json" with { type: "json" };

const fr = {
  ...frRhdh,
  ...frCommunityPlugins,
  ...frRhdhPlugins,
  ...frMissingTranslations,
};

const it = {
  ...itRhdh,
  ...itCommunityPlugins,
  ...itRhdhPlugins,
};

const ja = {
  ...jaRhdh,
  ...jaCommunityPlugins,
  ...jaRhdhPlugins,
};

export type Locale = "en" | "fr" | "it" | "ja";

type TranslationFile = Record<string, Record<string, Record<string, string>>>;

/**
 * Merge translations with English fallback.
 * For each namespace, if a locale doesn't have translations, fall back to English.
 */
function createMergedTranslations() {
  const allNamespaces = new Set([
    ...Object.keys(en),
    ...Object.keys(fr),
    ...Object.keys(it),
    ...Object.keys(ja),
  ]);

  const merged: Record<string, Record<string, Record<string, string>>> = {};

  for (const namespace of allNamespaces) {
    const enKeys = (en as TranslationFile)[namespace]?.en || {};
    merged[namespace] = {
      en: enKeys,
      fr: { ...enKeys, ...((fr as TranslationFile)[namespace]?.fr || {}) },
      it: { ...enKeys, ...((it as TranslationFile)[namespace]?.it || {}) },
      ja: { ...enKeys, ...((ja as TranslationFile)[namespace]?.ja || {}) },
    };
  }

  return merged;
}

const translations = createMergedTranslations();

export function getCurrentLanguage(): Locale {
  const lang = process.env.LOCALE || "en";
  return lang as Locale;
}

export function getTranslations() {
  return translations;
}
