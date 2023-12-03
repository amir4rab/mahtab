import { getCollection, type CollectionEntry } from "astro:content";

/** Fetches the experiences and sort them by the newest start date. */
const getExperiences = () =>
  new Promise<CollectionEntry<"experiences">[]>((resolve, reject) => {
    try {
      getCollection("experiences").then((data) => {
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

export default getExperiences;
