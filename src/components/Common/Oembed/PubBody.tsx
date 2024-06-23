// import Oembed from "../Oembed";
// import getURLs from "../../../utils/getUrls";
// import removeUrlAtEnd from "../../../utils/removeUrlAtEnd";
// import type { OG } from "../../../types/misc";

// import Link from "next/link";
// import type { FC } from "react";
// import { useState } from "react";
// import { isIOS, isMobile } from "react-device-detect";
// import { PostFragment, Publication } from "@lens-protocol/client";
// interface PublicationBodyProps {
//   publication: PostFragment;
//   showMore?: boolean;
//   quoted?: boolean;
// }

// const PublicationBody: FC<PublicationBodyProps> = ({
//   publication,
//   showMore = false,
//   quoted = false,
// }) => {
//   const metadata = publication?.metadata;
//   // const canShowMore = metadata?.content?.length > 80 && showMore;
//   // const urls = getURLs(metadata?.content);
//   // const hasURLs = urls.length > 0;
//   // let rawContent = metadata?.content;

//   if (isIOS && isMobile && canShowMore) {
//     const truncatedRawContent = rawContent?.split("\n")?.[0];
//     if (truncatedRawContent) {
//       rawContent = truncatedRawContent;
//     }
//   }
//   //
//   const [content, setContent] = useState(rawContent);

//   // Show NFT if it's there
//   // Show snapshot if it's there
//   // Show attachments if it's there
//   const showAttachments = metadata?.media?.length > 0;
//   // Show quoted publication if it's there
//   // Show oembed if no NFT, no attachments, no snapshot, no quoted publication
//   const showOembed = hasURLs && !showAttachments;

//   // Remove URL at the end if oembed is there
//   const onOembedData = (data: OG) => {
//     if (showOembed && data?.title) {
//       const updatedContent = removeUrlAtEnd(urls, content);
//       if (updatedContent !== content) {
//         setContent(updatedContent);
//       }
//     }
//   };

//   return (
//     <div className="break-words text-white">
//       {/* Attachments and Quotes */}

//       {showOembed ? (
//         <Oembed
//           url={urls[0]}
//           publicationId={publication.id}
//           onData={onOembedData}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default PublicationBody;
