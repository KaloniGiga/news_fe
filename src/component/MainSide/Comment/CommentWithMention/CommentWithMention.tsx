import { useGetUserForMentionQuery } from "@/redux/user/user.api";
import React, { FunctionComponent, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { mentionStyles } from "./mentionStyles";
import { mentionStylesInput } from "./mentionStylesInput";

interface ICommentWithMention {
  placeholder: string;
  handleCommentChange: (e: any) => void;
  value: string;
  handleMentionAdd: (id: any, display: any) => void;
}
const CommentWithMention: FunctionComponent<ICommentWithMention> = ({
  placeholder,
  handleCommentChange,
  value,
  handleMentionAdd,
}) => {
  // const { isLoading, data: mentionData, isError } = useGetUserForMentionQuery("");
  const users = [
    {
      id: "isaac",
      display: "Isaac Newton",
    },
    {
      id: "sam",
      display: "Sam Victor",
    },
    {
      id: "emma",
      display: "emmanuel@nobody.com",
    },
  ];

  // console.log(mentions, value);
  return (
    <MentionsInput
      placeholder={placeholder}
      style={mentionStylesInput}
      value={value}
      onChange={handleCommentChange}
      a11ySuggestionsListLabel={"Suggested JsonPlaceholder username for mention"}
      allowSpaceInQuery
    >
      <Mention
        appendSpaceOnAdd
        onAdd={handleMentionAdd}
        trigger="@"
        data={users}
        displayTransform={(id, display) => `@${display}`}
      />
    </MentionsInput>
  );
};

export default CommentWithMention;
