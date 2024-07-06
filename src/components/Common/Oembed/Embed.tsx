// @ts-nocheck

import "@/styles/fonts.css";
import type { FC } from "react";
import { imageKit } from "@/utils/imageKit";

import type { OG } from "@/types/misc";

import Link from "next/link";


interface EmbedProps {
  og: OG;
  publicationId?: string;
}

const Embed: FC<EmbedProps> = ({ og, publicationId }) => {
  return (
    <div
      className="mt-4 text-sm sm:w-4/6 rounded-xl"
      style={{ fontFamily: "Aeonik" }}
      data-testid={`normal-oembed-${og.url}`}
    >
      <Link
        href={og.url}
        onClick={(event) => {
          event.stopPropagation();
        }}
        target={og.url.includes(location.host) ? "_self" : "_blank"}
        rel="noreferrer noopener"
      >
        <div className="rounded-xl py-1 flex">
          {(og.isLarge && og.image) && (
            <img
              className="size-[144px] divider aspect-2 w-full rounded-t-xl object-cover"
              onError={({ currentTarget }) => {
                currentTarget.src = og.image as string;
              }}
              height={144}
              width={144}
              src={imageKit(og.image, "tr:w-1000")}
              alt="Thumbnail"
            />
          )}
          <div className="flex max-w-[85vw]  items-center rounded-xl bg-white py-2  shadow-md">
            {(!og.isLarge && og.image) && (
              <div className="truncate w-full  p-5  bg-white   rounded-l-xl    p-4 px-8">
                <div className="space-y-1  ml-[-0.9rem]">
                  {og.title && (
                    <div
                      style={{ fontFamily: "Aeonik-Bold" }}
                      className="truncate text-black font-bold text-[1rem]"
                    >
                      {og.title}
                    </div>
                  )}
                  {og.description && (
                    <div className="text-[#202020] line-clamp-4 whitespace-break-spaces">
                      {og.description}
                    </div>
                  )}
                  {og.site ? (
                    <div className="flex items-center space-x-2 pt-1.5">
                      {og.favicon ? (
                        <img
                          className="h-4 w-4 rounded-full"
                          height={16}
                          width={16}
                          src={og.favicon}
                          alt="Favicon"
                        />
                      ) : null}
                      <div className="text-[#202020] text-xs">{og.site}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            {(!og.isLarge && og.image) && (
              <img
                className=" size-[35vw] mr-3 rounded-lg border-r shadow-xl dark:border-gray-700"
                height={144}
                width={144}
                onError={({ currentTarget }) => {
                  currentTarget.src = og.image as string;
                }}
                src={imageKit(og.image, "tr:w-1000")}
                alt="Thumbnail"
              />
            )}
            {og.isLarge && (
              <div className="truncate bg-black bg-opacity-15  rounded-b-xl  backdrop-blur-md  p-4 px-8">
                <div className="space-y-1.5 ml-[-1.6rem]">
                  <div className="flex justify-between items-center">
                    {og.title && (
                      <div
                        style={{ fontFamily: "Aeonik-Bold" }}
                        className="truncate font-bold text-[1.2rem] pr-12"
                      >
                        {og.title}
                      </div>
                    )}
                    {og.site && (
                      <div className="flex items-center  space-x-0 pt-1.5">
                        {og.favicon && (
                          <img
                            className="h-4 w-4 rounded-full"
                            height={16}
                            width={16}
                            src={og.favicon}
                            alt="Favicon"
                          />
                        )}
                        <div
                          style={{ fontFamily: "Aeonik-Bold" }}
                          className="lt-text-gray-500  text-xs"
                        >
                          {og.site}
                        </div>
                      </div>
                    )}
                  </div>
                  {og.description && (
                    <div className="lt-text-gray-500 text-[0.95rem] line-clamp-2 whitespace-break-spaces">
                      {og.description}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Embed;
