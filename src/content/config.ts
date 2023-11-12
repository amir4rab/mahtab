import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.string(),
    role: z.string(),
    description: z.string(),
    // Assets
    banner: z.string(),
    bannerRatio: z.string(),
    // Links
    website: z.string().optional(),
    repository: z.string().optional(),
    // Dates
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

const experiencesCollection = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    position: z.string(),
    description: z.string(),
    // Assets
    banner: z.string().optional(),
    bannerRatio: z.string().optional(),
    logo: z.string().optional(),
    // Links
    website: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    // Dates
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  experiences: experiencesCollection,
};
