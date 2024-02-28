/* eslint-disable react/display-name */
import { useGetUserForMentionQuery } from "@/redux/user/user.api";
import { Button, ButtonGroup, ScrollArea, Stack, Text } from "@mantine/core";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { isLoading, data: mentionData, isError } = useGetUserForMentionQuery(props.query);

  const selectItem = (index: any) => {
    if (mentionData && mentionData.data.length > 0) {
      const item = mentionData.data[index];

      if (item) {
        props.command({ id: item.username });
      }
    }
  };

  const upHandler = () => {
    if (mentionData && mentionData.data.length > 0) {
      setSelectedIndex((selectedIndex + mentionData.data.length - 1) % mentionData.data.length);
    }
  };

  const downHandler = () => {
    if (mentionData && mentionData.data.length > 0) {
      setSelectedIndex((selectedIndex + 1) % mentionData.data.length);
    }
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [mentionData]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="w-[200px] items flex flex-col">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load user.</div>}
      <ScrollArea.Autosize mah={150} scrollbars="y">
        {mentionData &&
          mentionData?.data.length &&
          mentionData?.data.map((item: any, index: any) => (
            <Button
              variant="subtle"
              color="gray"
              className={`item ${index === selectedIndex ? "is-selected" : ""}`}
              key={index}
              onClick={() => selectItem(index)}
              fullWidth
            >
              <Text className="text-mantineText cursor-pointer">{item.username}</Text>
            </Button>
          ))}
      </ScrollArea.Autosize>
    </div>
  );
});
