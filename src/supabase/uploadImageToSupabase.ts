// @ts-nocheck

import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";
import { supabase } from "@/supabase/supabaseClient";

export const uploadToSupabase = async (
  base64Image: string,
  imageExtension = "jpg",
  bucketName = "images" // Default bucket set to "images"
): Promise<string | null> => {
  try {
    const base64Str = base64Image.includes("base64,")
      ? base64Image.substring(base64Image.indexOf("base64,") + "base64,".length)
      : base64Image;
    const res = decode(base64Str);

    if (!(res.byteLength > 0)) {
      console.error("[uploadToSupabase] ArrayBuffer is null");
      return null;
    }

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${nanoid()}.${imageExtension}`, res, {
        contentType: `image/${imageExtension}`,
      });

    if (error) {
      console.error("[uploadToSupabase] upload: ", error);
      return null;
    }
    // Correctly access the path from the upload response
    const { data: storageData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path); // Use 'data.path' directly

    return storageData.publicUrl;
  } catch (err) {
    console.error(err);
    return null;
  }
};
