const DEFAULT_IMAGES = [
  "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
  "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
  "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
];
export function fillUserImages(users: {pfp?: string}[], num=3) {
  const userImages = [
    ...(users?.map((user) => user.pfp).filter(Boolean) ?? []),
    ...DEFAULT_IMAGES,
  ].slice(0, 3);
  return userImages
}