"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditorProvider, RichTextField } from "mui-tiptap";
import { FunctionComponent, useState } from "react";
import LinkPreview from "./LinkPreview";

export interface IShareLink {
  onChange: (val: string) => void;
  value: string;
}
const ShareLink: FunctionComponent<IShareLink> = ({ onChange, value }) => {
  const [linkToPreview, setLinkToPreview] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "Share the link" })],
    content: `<p>${value}</p>`,
    editorProps: {
      attributes: {
        class: "sharelink",
      },
    },
    onUpdate: ({ editor }) => {
      const htmlString = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const pContent = doc.querySelector("p")?.textContent;
      let pContentArray;
      if (pContent) {
        pContentArray = pContent?.split(",");
        onChange(pContentArray[pContentArray.length - 1]);
      }
      if (pContentArray && pContentArray.length > 0) {
        const isUrlValid =
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
            pContentArray[pContentArray.length - 1]
          );

        if (isUrlValid) {
          setLinkToPreview(pContentArray[pContentArray?.length - 1]);
        } else {
          setLinkToPreview("");
        }
      }
    },
  });
  return (
    <div className="shareLinkContainer">
      <RichTextEditorProvider editor={editor}>
        <RichTextField></RichTextField>
      </RichTextEditorProvider>
      {
        <div>
          <LinkPreview url={linkToPreview} />
        </div>
      }
    </div>
  );
};

export default ShareLink;
