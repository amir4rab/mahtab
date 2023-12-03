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

const educationsCollection = defineCollection({
  type: "content",
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    description: z.string().optional(),
    gpa: z.string().optional(),
    // Assets
    logo: z.string().optional(),
    // Links
    website: z.string().optional(),
    // Dates
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

const certificatesCollection = defineCollection({
  type: "content",
  schema: z.object({
    institution: z.string(),
    title: z.string(),
    gpa: z.string().optional(),
    // Assets
    logo: z.string().optional(),
    // Links
    website: z.string().optional(),
    degreeURL: z.string().optional(),
    // Dates
    date: z.date().optional(),
    expireDate: z.date().optional(),
  }),
});

const blogsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    state: z.enum([
      "published", // Will be listed on the blogs page
      "draft", // Won't be listed on the blogs page, but would be visible with the url
      "private", // Won't be rendered
    ]),
    // Assets
    banner: z.string(),
    bannerRatio: z.string(),
    // Links
    website: z.string().optional(),
    repository: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  experiences: experiencesCollection,
  blogs: blogsCollection,
  educations: educationsCollection,
  certificates: certificatesCollection,
};
