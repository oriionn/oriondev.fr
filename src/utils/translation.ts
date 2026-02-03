import { getCollection } from "astro:content";
import type { Translation } from "../content.config";
import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export async function getLocale(
    Astro: Readonly<AstroGlobal<Record<string, any>, AstroComponentFactory, Record<string, string | undefined>>>
): Promise<{ translation: Translation, lang: "fr" | "en" }> {
    const translations = await getCollection("translations");
    let lang = Astro.params.lang ?? "en";

    if (lang !== "en" && lang !== "fr") throw new Error("Invalid lang");

    let translation = translations.filter((translation: { id: string }) => translation.id === lang);
    return {
        translation: translation[0].data,
        lang
    }
}

export async function getTranslation(lang: string): Promise<Translation> {
    const translations = await getCollection("translations");
    const translation = translations.filter(
        (translation: { id: string }) => translation.id === lang,
    )[0].data;

    return translation;
}
