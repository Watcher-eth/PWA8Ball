import { create } from "zustand";

// Define the Upload state type
interface UploadState {
  time: number;
  setTime: (time: number) => void;

  text: string;
  setText: (text: string) => void;

  title: string;
  setTitle: (title: string) => void;

  subject: string;
  setSubject: (title: string) => void;

  type: string;
  setType: (type: string) => void;

  media: string;
  setMedia: (gifUrl: string) => void;

  secondaryMedia: string;
  setSecondaryMedia: (secondaryMedia: string) => void;

  mediaHash: string;
  setMediaHash: (gifUrl: string) => void;

  secondaryMediaHash: string;
  setSecondaryMediaHash: (secondaryMediaHash: string) => void;
  imageType: string;
  setImageType: (imageType: string) => void;

  resetContext: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  time: 24,
  setTime: (time) => set({ time }),
  imageType: "",
  setImageType: (imageType) => set({ imageType }),
  text: "",
  setText: (text) => set({ text }),
  title: "",
  setTitle: (title) => set({ title }),

  type: "text",
  setType: (type) => set({ type }),

  subject: "",
  setSubject: (subject) => set({ subject }),

  media: "",
  setMedia: (media) => set({ media }),

  secondaryMedia: "",
  setSecondaryMedia: (secondaryMedia) => set({ secondaryMedia }),

  mediaHash: "",
  setMediaHash: (mediaHash) => set({ mediaHash }),

  secondaryMediaHash: "",
  setSecondaryMediaHash: (secondaryMediaHash) => set({ secondaryMediaHash }),

  resetContext: () => {
    set({
      time: 24,
      text: "",
      type: "image",
      subject: "",
      media: "",
      secondaryMedia: "",
    });
  },
}));
