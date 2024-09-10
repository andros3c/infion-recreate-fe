"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./text-editor.css";

import { useRef, useCallback } from "react";
import { ref, deleteObject } from "firebase/storage";
import { imageDb } from "@/utils/firebase/config";
import { useUploadImageMutations } from "@/hooks/queries/mutations/useUploadImageMutations";

const createQuillModules = (handleImageUpload) => ({
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: handleImageUpload,
    },
  },
});

const useImageUpload = (onSuccess) => {
  const { mutateAsync: handleSaveImage } = useUploadImageMutations({
    config: { onSuccess },
  });

  return { handleSaveImage };
};

export const QuillEditor = ({
  value,
  setValue,
  imageUrls,
  setImageUrls,
  isReadOnly,
}) => {
  const quillRef = useRef(null);

  const onSuccess = (data) => {
    data;
  };

  const { handleSaveImage } = useImageUpload(onSuccess);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      try {
        const result = await handleSaveImage({ image: file });
        const imageUrl = result.downloadURL;

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
            setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
            setValue(quill.root.innerHTML);
          } else {
            console.error("No selection range found in Quill editor.");
          }
        } else {
          console.error("Quill editor reference is not available.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSaveImage, setValue]);

  const handleDeleteImage = useCallback(
    async (imageUrl) => {
      try {
        setImageUrls((prevUrls) => prevUrls.filter((url) => url !== imageUrl));

        const imageRef = ref(imageDb, imageUrl);
        await deleteObject(imageRef);

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const delta = quill.getContents();
          delta.ops.forEach((op) => {
            if (op.insert && op.insert.image === imageUrl) {
              quill.deleteText(op.index, op.length); // Remove the image from the editor
            }
          });
          setValue(quill.root.innerHTML); // Update the editor value
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue]
  );
  const modules = createQuillModules(handleImageUpload);

  const handleEditorChange = (content) => {
    setValue(content);

    const quill = quillRef.current?.getEditor();

    if (quill && !isReadOnly) {
      const delta = quill.getContents();
      const imagesInEditor = [];
      delta.ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          imagesInEditor.push(op.insert.image);
        }
      });

      // Find deleted images
      const deletedImages = imageUrls.filter(
        (url) => !imagesInEditor.includes(url)
      );

      deletedImages.forEach((imageUrl) => {
        handleDeleteImage(imageUrl);
      });
    }
  };

  return (
    <ReactQuill
      style={{
        width: "100%",
        border: "none !important",
      }}
      className="no-border"
      theme={"snow"}
      value={value}
      onChange={handleEditorChange}
      modules={modules}
      ref={quillRef}
      readOnly={isReadOnly}
    />
  );
};
