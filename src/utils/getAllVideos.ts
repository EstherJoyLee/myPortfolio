import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

export const getAllVideoUrls = async () => {
  try {
    const folderRef = ref(storage, "videos/");
    const result = await listAll(folderRef);

    const urls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef))
    );

    console.log("📦 [Firebase] 전체 video URLs:", urls);
    return urls;
  } catch (error) {
    console.error("🔥 Firebase Storage URL 가져오기 실패:", error);
    return []; // 실패 시 빈 배열 반환
  }
};
