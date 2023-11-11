// Types
import {
  type ComponentProps,
  useEffect,
  useRef,
  useCallback,
} from "preact/compat";

// Signals
import { useSignal } from "@preact/signals";

// Hooks
import useMatchMedia from "@/hooks/useMediaMatch";
import useShare from "@/hooks/useShare";

// Interface
interface ShareButtonProps {
  href?: string;
  text?: string;
  repositoryURL?: string | undefined;
  websiteURL?: string | undefined;
  children: ComponentProps<"div">["children"];
}

const ShareButton = ({
  children,
  href,
  text,
  repositoryURL,
  websiteURL,
}: ShareButtonProps) => {
  // References
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const expanderRef = useRef<HTMLDivElement | null>(null);

  // Signals
  const hovering = useSignal(false);

  // Hooks
  const isDesktop = useMatchMedia();
  const { canShare, share } = useShare();

  // Decides weather the expanding would be on the right side or the left side of the button element
  useEffect(() => {
    const { current: wrapper } = wrapperRef;
    const { current: expander } = expanderRef;
    if (wrapper === null || expander === null || typeof window === "undefined")
      return;

    const { left, width } = wrapper.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    if (left + width > windowWidth / 2) {
      expander.setAttribute("data-expand-on", "left");
    } else {
      expander.setAttribute("data-expand-on", "right");
    }

    // Since this element doesn't observe screen width changes, we'll update it if the screen gets bigger or smaller than tailwind 'md' breakpoint.
    if (isDesktop.value) {
    }
  }, [isDesktop.value]);

  /** Only opens the expanded list on desktop */
  const onPointer = useCallback(
    (v: boolean) => {
      isDesktop.value && (hovering.value = v);
    },
    [isDesktop.value]
  );

  /** Only opens the expanded list on mobile */
  const onOpenByClick = useCallback(() => {
    if (isDesktop.value) return;

    hovering.value = true;
    (expanderRef.current?.firstChild as HTMLElement | null)?.focus();
  }, [isDesktop.value]);

  return (
    <div
      ref={wrapperRef}
      // Events for desktop devices
      onPointerEnter={onPointer.bind(null, true)}
      onPointerLeave={onPointer.bind(null, false)}
      // States
      data-visible={!hovering.value}
      // ClassNames
      className={[
        "relative",
        "cursor-pointer",
        "[--base-button-offset:_0%]",
        "md:hover:[--base-button-offset:_-100%]",
        "bg-neutral-100",
        "dark:bg-neutral-800",
        "data-[visible=false]:bg-transparent",
        "flex",
        "justify-center",
        "items-center",
        "rounded-xl",
        "duration-500",
        "ease-elastic-1",
        "transition-[colors,colors]",
      ].join(" ")}
    >
      {/* Wraps the children by a button component */}
      <button
        onClick={onOpenByClick}
        className={[
          "p-2",
          "opacity-[calc(100%_+_var(--base-button-offset))]",
          "transition-[transform,opacity]",
          "duration-150",
          "ease-elastic-1",
          "hover:text-primary-900",
          "hover:dark:text-primary-300",
        ].join(" ")}
      >
        {children}
      </button>
      {/* The Expander element */}
      <div
        ref={expanderRef}
        // Exiting the expanded state on blur
        onBlur={() => !isDesktop.value && (hovering.value = false)}
        onBlurCapture={() => !isDesktop.value && (hovering.value = false)}
        // States
        data-visible={hovering.value}
        data-expand-on={"right"}
        // ClassNames
        className={[
          // Main Stylings
          "absolute",
          "top-0",
          "w-[12rem]",
          "p-2",
          "z-10",
          "opacity-0",
          "pointer-events-none",
          "bg-neutral-100",
          "dark:bg-neutral-800",
          "transition-[transform,opacity,clip-path]",
          "duration-300",
          "ease-elastic-1",
          "rounded-xl",
          "flex",
          "flex-col",
          "gap-2",
          // Visible Styles
          "data-[visible=true]:pointer-events-auto",
          "data-[visible=true]:opacity-100",
          "data-[visible=true]:rounded-2xl",
          // Open on Right
          "data-[expand-on=right]:left-0",
          "data-[expand-on=right]:[--left-mask:calc(100%_-_2rem)]",
          // Open on Left
          "data-[expand-on=left]:right-0",
          "data-[expand-on=left]:[--right-mask:calc(100%_-_2rem)]",
          // Masks
          "[clip-path:_inset(0rem_var(--left-mask,0rem)_calc(100%_-_2rem)_var(--right-mask,0rem)_round_theme(borderRadius.xl))]",
          "data-[visible=true]:[clip-path:_inset(0rem_0rem_0rem_0rem_round_theme(borderRadius.2xl))]",
          // Button Stylings
          "[&>.button]:rounded-[calc(theme(borderRadius.2xl)_-_.5rem)]",
          "[&>.button]:outline-none",
          "[&>.button]:w-full",
          "[&>.button]:flex",
          "[&>.button]:items-center",
          "[&>.button]:justify-start",
          "[&>.button]:gap-2",
          "[&>.button]:pl-3",
          "[&>.button]:pr-5",
          "[&>.button]:py-2",
          "[&>.button]:!font-light",
          "[&>.button]:text-xs",
          "[&>.button]:no-underline",
          // Button elements Animation
          "[&>.button>*]:transition-transform",
          "[&>.button>*]:duration-200",
          "[&>.button>*]:ease-elastic-1",
          "md:[&>.button:hover>*]:translate-x-[.2rem]",
          // Button Hover Animation
          "[&>.button]:transition-[colors]",
          "[&>.button]:duration-200",
          "[&>.button]:ease-elastic-1",
          "[&>.button:is(:hover,:focus-visible)]:text-primary-900",
          "dark:[&>.button:is(:hover,:focus-visible)]:text-primary-300",
          "[&>.button:is(:hover,:focus-visible)]:bg-primary-300/10",
        ].join(" ")}
      >
        {/* Share Button */}
        {href && text && canShare.value && (
          <button
            onClick={share.bind(null, { text, url: href })}
            className="button"
          >
            {/* The Following svg icon belongs to 'Material Design Icons' and licensed under 'Apache-2.0 license', see: https://github.com/material-icons/material-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
              ></path>
            </svg>
            <span>Share</span>
          </button>
        )}
        {/* Open in New Tab Button */}
        {href && (
          <a href={href} target="_blank" rel="noreferrer" className="button">
            {/* The Following svg icon belongs to 'Material Design Icons' and licensed under 'Apache-2.0 license', see: https://github.com/material-icons/material-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"
              ></path>
            </svg>
            <span>Open in New Tab</span>
          </a>
        )}
        {/* GH Repository Button */}
        {repositoryURL && (
          <a
            href={repositoryURL}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            {/* The Following svg icon belongs to 'Simple Icons' and licensed under 'CC0-1.0 license', see: https://github.com/simple-icons/simple-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              ></path>
            </svg>
            <span>Open Repository</span>
          </a>
        )}
        {/* Website Button */}
        {websiteURL && (
          <a
            href={websiteURL}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            {/* The Following svg icon belongs to 'Material Design Icons' and licensed under 'Apache-2.0 license', see: https://github.com/material-icons/material-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 2a6 6 0 0 0-6.75-5.95c-2.62.32-4.78 2.41-5.18 5.02c-.33 2.15.49 4.11 1.93 5.4c.48.43 1.23.33 1.56-.23l.01-.01c.24-.42.14-.93-.22-1.26a3.997 3.997 0 0 1-1.22-3.94a3.954 3.954 0 0 1 2.9-2.91A3.999 3.999 0 0 1 16 13c0 1.18-.52 2.23-1.33 2.96c-.36.32-.47.84-.23 1.26l.01.01c.31.53 1.03.69 1.5.28A5.996 5.996 0 0 0 18 13zm-7.17-9.93c-4.62.52-8.35 4.33-8.78 8.96a9.966 9.966 0 0 0 4.02 9.01c.48.35 1.16.2 1.46-.31c.25-.43.14-.99-.26-1.29c-2.28-1.69-3.65-4.55-3.16-7.7c.54-3.5 3.46-6.29 6.98-6.68C15.91 4.51 20 8.28 20 13c0 2.65-1.29 4.98-3.27 6.44c-.4.3-.51.85-.26 1.29c.3.52.98.66 1.46.31A9.96 9.96 0 0 0 22 13c0-5.91-5.13-10.62-11.17-9.93z"
              ></path>
            </svg>
            <span>Open Website</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ShareButton;
