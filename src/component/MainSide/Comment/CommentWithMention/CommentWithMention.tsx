import { useGetUserForMentionQuery, useLazyGetUserForMentionQuery } from "@/redux/user/user.api";
import React, { FunctionComponent, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { mentionStyles } from "./mentionStyles";
import { mentionStylesInput } from "./mentionStylesInput";
import { debounce } from "lodash";

interface ICommentWithMention {
  placeholder: string;
  handleCommentChange: any;
  value: string;
  handleMentionAdd: (id: any, display: string) => void;
}
const CommentWithMention: FunctionComponent<ICommentWithMention> = ({
  placeholder,
  handleCommentChange,
  value,
  handleMentionAdd,
}) => {
  const [getUserForMention, { isLoading, data: mentionData, isError }] = useLazyGetUserForMentionQuery();

  const fetchUserSuggestion = (query: any, callback: any) => {
    getUserForMention(query)
      .unwrap()
      .then(payload => callback(payload.data))
      .catch(error => console.log(error));
  };
  const debouncedGetUserForMention = debounce(fetchUserSuggestion, 500);

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

  return (
    <>
      <MentionsInput
        placeholder={placeholder}
        style={mentionStylesInput}
        value={value}
        onChange={handleCommentChange}
        a11ySuggestionsListLabel={"Mention users."}
        allowSpaceInQuery
      >
        <Mention
          appendSpaceOnAdd
          trigger="@"
          data={(search, callback) => {
            debouncedGetUserForMention(search, callback);
          }}
          displayTransform={(id, display) => `@${display}`}
          onAdd={handleMentionAdd}
          // markup="@[__display__](__id__)"
          style={mentionStyles}
        />
      </MentionsInput>
    </>
  );
};

export default CommentWithMention;
