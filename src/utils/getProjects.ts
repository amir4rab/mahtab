import { getCollection, type CollectionEntry } from "astro:content";

/** Fetches the projects and sort them by the newest start date. */
const getProjects = () =>
  new Promise<CollectionEntry<"projects">[]>((resolve, reject) => {
    try {
      getCollection("projects").then((data) => {
        const result = data.sort((a, b) => {
          const aSD = a.data.startDate ? a.data.startDate : 0;
          const bSD = b.data.startDate ? b.data.startDate : 0;

          if (aSD > bSD) return -1;
          if (aSD < bSD) return 1;
          return 0;
        });

        resolve(result);
      });
    } catch (err) {
      console.error(err);
      reject([]);
    }
  });

export default getProjects;
