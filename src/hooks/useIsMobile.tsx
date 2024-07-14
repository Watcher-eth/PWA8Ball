import { useMediaQuery } from "usehooks-ts";

export function useIsMobile() {
  const isMobile = useMediaQuery("(max-width: 640px)", {
    initializeWithValue: false,
  });

  return isMobile //?? false;
}