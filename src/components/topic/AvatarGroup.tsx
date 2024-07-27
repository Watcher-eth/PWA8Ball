export function AvatarGroup({ images }: { images: string[] }) {
  return (
    <div className="flex mt-1 -space-x-2">
      {images?.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Avatar ${index}`}
          className="size-6 rounded-full border-2 border-[#070707]"
        />
      ))}
    </div>
  );
}
