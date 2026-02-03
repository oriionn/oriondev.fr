import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:schema";

const translationScheme = z.object({
    subtitle: z.string(),
    home: z.object({
        title: z.string(),
        intl: z.string()
    }),
    github: z.object({
        months: z.array(z.string())
    }),
    work: z.object({
        title: z.string()
    }),
    projects: z.object({
        title: z.string()
    }),
    events: z.object({
        title: z.string(),
        certificate: z.string()
    }),
    friends: z.object({
        title: z.string()
    }),
    footer: z.object({
        designed: z.string(),
        copyright: z.string()
    })
})

const translations = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./content/translations" }),
    schema: translationScheme,
});

export type Translation = z.infer<typeof translationScheme>;

const bio = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/bio" })
})

export const collections = { translations, bio };
