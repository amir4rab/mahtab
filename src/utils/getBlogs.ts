import { getCollection, type CollectionEntry } from "astro:content";

/** Fetches blogs, filtering them by their state and then sorting them by the newest start date. */
const getBlogs = () =>
  new Promise<CollectionEntry<"blogs">[]>((resolve, reject) => {
    try {
      getCollection("blogs").then((data) => {
        const result = data
          .filter(({ data: { state } }) => state === "published")
          .sort((a, b) => {
            const aSD = a.data.date ? a.data.date : 0;
            const bSD = b.data.date ? b.data.date : 0;

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

export default getBlogs;
