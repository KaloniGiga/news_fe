export const mentionStylesInput = {
  "&multiLine": {
    control: {
      // background: "var(--mantine-color-body)",
      minHeight: 80,
    },
    input: {
      overflow: "auto",
      outline: "none",
      padding: 10,
    },
    highlighter: {
      overflow: "hidden",
      boxSizing: "border-box",
    },
  },
  suggestions: {
    list: {
      backgroundColor: "var(--mantine-color-body)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-8))",
      fontSize: 16,
    },
    item: {
      padding: "5px 10px",
      borderBottom: "1px",
      borderColor: "light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-8))",
      "&focused": {
        backgroundColor: "light-dark(var(--mantine-color-gray-8), var(--mantine-color-dark-2))",
      },
    },
  },
};
