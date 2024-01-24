"use client";
// import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditorProvider, RichTextField } from "mui-tiptap";
import { useState } from "react";
import LinkPreview from "./LinkPreview";

const ShareLink = () => {
  const [linkToPreview, setLinkToPreview] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "Share the link" })],
    onUpdate: ({ editor }) => {
      const htmlString = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const pContent = doc.querySelector("p")?.textContent;
      const pContentArray = pContent?.split(",");
      console.log(pContentArray);
      //    console.log(pContentArray[pContentArray.length - 1]);
      if (pContent) {
        const isUrlValid =
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
            pContent
          );

        if (isUrlValid) {
          setLinkToPreview(pContent);
        }
      }
    },
  });
  return (
    <div>
      <RichTextEditorProvider editor={editor}>
        <RichTextField className="border-none outline-none"></RichTextField>
      </RichTextEditorProvider>
      <div>
        {/* <LinkPreview fallback={<div>No Data</div>} url="https://www.roastworks.co.uk/" width="400px" /> */}
        <LinkPreview url={"https://www.roastworks.co.uk/"} />
      </div>
    </div>
  );
};

export default ShareLink;
