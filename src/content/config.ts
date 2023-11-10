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

export const collections = {
  projects: projectsCollection,
};
