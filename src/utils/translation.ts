import { getCollection } from "astro:content";
import type { Translation } from "../content.config";

export async function getTranslation(lang: string): Promise<Translation> {
    const translations = await getCollection("translations");
    const translation = translations.filter(
        (translation) => translation.id === lang,
    )[0].data;

    return translation;
}
