type MahtabData = {
  title: string;
  description: string;
  websiteURL: string;
  socials: {
    name: string;
    icon: string;
    href: string;
  }[];
};

import Data from "./data.json";

export default Data as MahtabData;
