import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";

/** Shares media with `navigator.share(..)` API */
const useShare = () => {
  /** Determines the possibility of sharing media */
  const canShare = useSignal(false);

  /** Shares the media */
  const share = useCallback((v: ShareData) => {
    try {
      navigator.share(v);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Checks the availability of `navigator.share` API
  useEffect(() => {
    canShare.value = typeof navigator.share !== "undefined";
  }, []);

  return {
    canShare,
    share,
  };
};

export default useShare;
