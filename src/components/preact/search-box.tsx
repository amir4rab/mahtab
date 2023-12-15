// Preact
import { useSignal } from "@preact/signals";
import { useCallback, useEffect, useMemo, useRef } from "preact/hooks";

// Types
import type { CollectionEntry } from "astro:content";

// Konj UI
import { AnchoredDialog } from "@konj-org/preact-ui";

// Fuze
import Fuse from "fuse.js";

// Internal Types
type BlogItem = CollectionEntry<"blogs"> & { type: "blog"; title: string };
type ProjectItem = CollectionEntry<"projects"> & {
  type: "project";
  title: string;
};
type SearchableItems = BlogItem | ProjectItem;

const SearchBox = ({
  children,
  blogs,
  projects,
}: {
  children: any;
  blogs: CollectionEntry<"blogs">[];
  projects: CollectionEntry<"projects">[];
}) => {
  // Signals
  const searchBoxState = useSignal(false);
  const query = useSignal("");

  // Refs
  const fuzeRef = useRef<Fuse<SearchableItems> | null>(null);

  /** List of Searchable components */
  const searchableItems = useMemo(() => {
    const searchableItems: SearchableItems[] = [
      ...blogs.map(
        (blog) =>
          ({
            type: "blog",
            title: blog.data.title,
            ...blog,
          } satisfies BlogItem)
      ),
      ...projects.map(
        (project) =>
          ({
            type: "project",
            title: project.data.title,
            ...project,
          } satisfies ProjectItem)
      ),
    ];

    if (fuzeRef.current === null)
      fuzeRef.current = new Fuse(searchableItems, {
        keys: ["slug", "title", "type"],
        includeScore: true,
        threshold: 1,
        sortFn: (a, b) => (a.score > b.score ? 1 : a.score < b.score ? -1 : 0),
      });

    return searchableItems;
  }, [blogs, projects]);

  /** Filtered items to be displayed */
  const filteredItems = useMemo(
    () =>
      query.value === ""
        ? searchableItems.slice(0, 10).map((item) => ({ score: 0, item }))
        : fuzeRef.current!.search(query.value),
    [query.value, searchableItems]
  );

  // Opens the search box
  const openSearchBox = useCallback((e: Event) => {
    e.preventDefault();
    searchBoxState.value = true;
  }, []);

  // Hydrating the search button in the navbar with the opening event on the click
  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchbox = document.getElementById("navigation-search");

    if (!searchbox) return;

    searchbox.addEventListener("click", openSearchBox);
  }, []);

  return (
    <AnchoredDialog
      slim
      state={searchBoxState.value}
      setState={(v) => (searchBoxState.value = v as boolean)}
      title="Search"
    >
      <div className="h-full overflow-y-auto">
        <div class="mb-4 sticky top-0 bg-neutral-100 dark:bg-neutral-900 pb-2">
          <input
            class="pl-6 pr-10 py-2 w-full text-sm rounded-2xl overflow-hidden"
            placeholder="Search Input"
            type="search"
            onKeyUp={(e) => {
              query.value = (e.target as HTMLInputElement).value;
            }}
          />
          <div class="absolute top-[50%] translate-y-[calc(-50%_-_theme(spacing.1))] right-4 pointer-events-none">
            {children}
          </div>
        </div>
        <ol className="gap-4 grid shrink-0">
          {filteredItems.map(
            ({
              item: {
                type,
                title,
                slug,
                data: { description, banner, bannerRatio },
              },
            }) => (
              <li
                className="list-none ml-0 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden flex flex-col"
                key={type + "-" + slug}
              >
                {banner && (
                  <img
                    alt={title + " Banner"}
                    src={"/assets/" + banner}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-sm my-0"
                    style={"aspect-ratio:" + bannerRatio + ";"}
                  />
                )}
                <div className="px-8 py-4 flex grow flex-col">
                  <p className="text-xl font-semibold mt-0 mb-1">{title}</p>
                  <p className="text-sm my-0 font-light opacity-75">
                    {description}
                  </p>
                  <div className="flex justify-end mt-4 grow items-end">
                    <a
                      onClick={() => (searchBoxState.value = false)}
                      href={"/" + type + "s/" + slug}
                      className="text-sm"
                    >
                      {type === "blog" && "Read Blog"}
                      {type === "project" && "View Project"}
                    </a>
                  </div>
                </div>
              </li>
            )
          )}
        </ol>
      </div>
    </AnchoredDialog>
  );
};

export default SearchBox;
