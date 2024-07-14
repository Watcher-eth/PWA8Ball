import { useMediaQuery } from "usehooks-ts";

export function useIsMobile() {
  const isMobile = useMediaQuery("(max-width: 640px)", {
    defaultValue: false,
    initializeWithValue: false,
  });

  return isMobile ?? false;
}