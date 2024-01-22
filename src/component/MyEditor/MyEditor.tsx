import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";

const MyEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello <b>world</b>!</p>",
  });
  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
};

export default MyEditor;
