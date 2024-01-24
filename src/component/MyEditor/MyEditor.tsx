import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  HeadingWithAnchor,
  LinkBubbleMenuHandler,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonStrikethrough,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";
import { FunctionComponent } from "react";

interface IMyEditor {
  placeholder: string;
}

const MyEditor: FunctionComponent<IMyEditor> = ({ placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      HeadingWithAnchor,
      LinkBubbleMenuHandler,
      TextAlign,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder,
      }),
    ],
  });
  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonUnderline />
            <MenuButtonStrikethrough />
            <MenuDivider />
            {/* <MenuButtonTextColor
              swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
             /> */}

            {/* <MenuButtonHighlightColor
          swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      /> */}

            <MenuButtonEditLink />

            <MenuDivider />

            <MenuSelectTextAlign />

            <MenuDivider />

            <MenuButtonOrderedList />

            <MenuButtonBulletedList />

            <MenuButtonTaskList />

            <MenuDivider />

            <MenuButtonBlockquote />

            <MenuDivider />

            <MenuButtonCode />

            <MenuButtonCodeBlock />

            <MenuDivider />

            <MenuButtonUndo />
            <MenuButtonRedo />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
};

export default MyEditor;
