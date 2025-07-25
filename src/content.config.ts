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
        certificate_link: z.string().nullable().default(null),
        type: z.enum(["hackathon", "ctf"]),
    }),
});

const translations = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./content/translations" }),
    schema: z.object({
        description: z.string(),
    }),
});

export const collections = { projects, events };
