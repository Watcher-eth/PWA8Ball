// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import React from "react";

function Qourum(props: { quorumId: string }) {
  return <div className="flex mt-3 flex-col items-center"></div>;
}

export default Qourum;

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { PostFragment } from "@lens-protocol/client";
import { Index } from "drizzle-orm/mysql-core";
import { Link } from "lucide-react";
import PublicationBody from "../Common/Oembed/PubBody";

export function PostLinkWithImage(props: { post: PostFragment }) {
  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                alt="Alec.lens"
                src={props?.post?.by?.metadata?.picture?.optimized?.uri}
              />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">
                {props?.post?.by?.metadata?.displayName}
              </div>
              <div className="text-xs text-gray-500">Shared Link</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
        <p className="text-sm mb-3">{props.post?.metadata?.content}</p>
        <div className="rounded-lg overflow-hidden">
          <img
            alt="Oppenheimer Review"
            className="w-full"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "343/200",
              objectFit: "cover",
            }}
            width="343"
          />
          <div className="bg-gray-100 p-3">
            <div className="text-lg font-semibold mb-1">Oppenheimer Review</div>
            <div className="text-xs text-gray-500">www.people/rfx.com</div>
          </div>
        </div>
      </div>
    </>
  );
}

function TextPost(props: { pub: PostFragment }) {
  return (
    <div className="bg-[#1A1A1A] text-white p-4 my-1 max-w-[90vw] min-w-[90vw] rounded-2xl shadow mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-[3rem] w-[3rem]">
            <AvatarImage
              alt="Christina.lens"
              src={props?.pub?.by?.metadata?.picture?.optimized?.uri}
            />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">
              {props?.pub?.by?.metadata?.displayName}
            </div>
            <div className="text-xs text-gray-300 space-x-1 flex items-center">
              <Link size={12} />
              <div>Shared Link</div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-300 self-start">Today</div>
      </div>
      <p className="text-sm max-w-[90vw] overflow-x-hidden ">
        {props?.pub?.metadata?.content}
      </p>
      <PublicationBody publication={props?.pub} />
    </div>
  );
}
