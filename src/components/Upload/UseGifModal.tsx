// @ts-nocheck

import React, { useState } from "react";
import {
  Grid,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import "isomorphic-fetch";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUploadStore } from "../../lib/context/UploadContext";

const apiKey = "sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh";
const gf = new GiphyFetch(apiKey);

export default function Home(props: { setOpen: () => void }) {
  const [searchTerm, setSearchTerm] = useState("meme"); // Initial empty search term
  const [offset, setOffset] = useState(0);
  const fetchGifs = () => gf.search(searchTerm, { offset, limit: 10 });
  const uploadStore = useUploadStore();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Update search term as user types
    setOffset(0); // Reset offset when search term changes
  };
  const handleGifClick = (gif) => {
    // Handle clicking on a GIF
    const gifUrl = gif.images.original.url;
    console.log("gifUrl", gifUrl);
    uploadStore.setMediaHash(gifUrl); // Set the media property to the GIF URL
    uploadStore.setMedia(gifUrl); // Set the media property to the GIF URL

    uploadStore.setType("gif");
    console.log("gif", gifUrl);
    props.setOpen(false);
  };
  return (
    <div className="self-center bg-[#101010] " style={{ zIndex: 15 }}>
      <div className="grid w-[92vw] max-w-sm items-center mt-3 gap-1.5 sticky top-0 bg-[#101010]   z-10">
        <Input
          type="text"
          placeholder="Choose a GIF"
          className="self-center border-0 w-full bg-[#202020] mb-4 mr-5 text-white"
          value={searchTerm === "meme" ? null : searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
        <Grid
          key={searchTerm} // Key should change if search term changes
          columns={2}
          width={370}
          noLink={true}
          fetchGifs={fetchGifs}
          onGifClick={handleGifClick} // Handle clicking on a GIF
        />
      </div>
    </div>
  );
}
