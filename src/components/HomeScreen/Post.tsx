// @ts-nocheck

import { PrimaryPublication } from "@lens-protocol/react-web";
import React from "react";

function Post(props: { publication: PrimaryPublication }) {
  return (
    <div className="flex flex-col relative self-center items-center h-[72vh] w-[95vw]">
      <img
        objectFit={"fill"} // {true} | {false}
        src={
          props?.publication?.__typename === "Post"
            ? props?.publication.metadata?.asset?.image?.optimized?.uri
            : ""
        }
      />
      <div className="absolute bottom-1 self-center text-center text-[1.1rem] w-[80vw] text-white">
        {props?.publication?.metadata?.content}
      </div>
    </div>
  );
}

export default Post;
