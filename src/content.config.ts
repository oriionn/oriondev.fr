import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./content/projects" }),
    schema: z.object({
        name: z.string(),
        link: z.string(),
        category: z.string(),
        type: z.enum(["pro_current", "pro_past", "personal"]),
    }),
});

const events = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./content/events" }),
    schema: z.object({
        name: z.string(),
        link: z.string(),
        certificate: z.string().nullable().default(null),
        type: z.enum(["hackathon", "ctf"]),
    }),
});

const translationSchema = z.object({
    title: z.string(),
    description: z.string(),
    headings: z.object({
        projects: z.string(),
        personal_projects: z.string(),
        events: z.string(),
        findme: z.string(),
    }),
    projects: z.object({
        currently: z.string(),
        past: z.string(),
        personal: z.string(),
    }),
    events: z.object({
        events: z.string(),
        certificate: z.string(),
    }),
    viewer: z.object({
        return: z.string(),
        download: z.string(),
    }),
});

const translations = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./content/translations" }),
    schema: translationSchema,
});

export type Translation = z.infer<typeof translationSchema>;

export const collections = { projects, events, translations };
