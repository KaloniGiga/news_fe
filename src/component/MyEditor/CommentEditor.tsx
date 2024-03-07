"use client";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { FunctionComponent, useEffect } from "react";
import suggestion from "../../utils/suggestion";

interface ICommentEditor {
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
}

const CommentEditor: FunctionComponent<ICommentEditor> = ({ placeholder, onChange, value }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      Placeholder.configure({
        placeholder,
      }),
      Mention.configure({
        renderHTML({ options, node }) {
          return [
            "a",
            { href: `/${node.attrs.label}`, target: "_blank", class: "mention", "data-id": node.attrs.id },
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
          ];
        },
        suggestion,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor?.getHTML());
    },
  });

  useEffect(() => {
    if (value) {
      editor?.commands.setContent(value);
    }
  }, []);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default CommentEditor;
