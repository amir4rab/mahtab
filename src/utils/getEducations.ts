import { getCollection, type CollectionEntry } from "astro:content";

/** Fetches the educations and sort them by the newest start date. */
const getEducations = () =>
  new Promise<CollectionEntry<"educations">[]>((resolve, reject) => {
    try {
      getCollection("educations").then((data) => {
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

export default getEducations;
