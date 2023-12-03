import { getCollection, type CollectionEntry } from "astro:content";

/** Fetches the certificates and sort them by the newest start date. */
const getCertificates = () =>
  new Promise<CollectionEntry<"certificates">[]>((resolve, reject) => {
    try {
      getCollection("certificates").then((data) => {
        const result = data.sort((a, b) => {
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

export default getCertificates;
