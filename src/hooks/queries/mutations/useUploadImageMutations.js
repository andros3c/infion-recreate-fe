import { imageDb } from "@/utils/firebase/config";
import { useMutateData } from "@/utils/useDataQuery";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
export const useUploadImageMutations = ({ config = {} }) => {
  const saveImage = async ({ image }) => {
    const imgRef = ref(imageDb, `files/${v4()}`);
    try {
      const uploadResult = await uploadBytes(imgRef, image);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return { ...uploadResult, downloadURL };
    } catch (error) {
      error;
    }
  };
  return useMutateData(saveImage, { ...config });
};
