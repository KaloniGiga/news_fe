/* eslint-disable react/display-name */
import { useLazyGetUserForMentionQuery } from "@/redux/user/user.api";
import { Button, Loader, ScrollArea, Text } from "@mantine/core";
import { debounce } from "lodash";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [getUserForMention, { isLoading, data: mentionData, isError, isSuccess }] = useLazyGetUserForMentionQuery(
    props.query
  );

  const fetchUserSuggestion = (query: any) => {
    getUserForMention(query);
  };

  const debouncedGetUserForMention = debounce(fetchUserSuggestion, 500);

  const selectItem = (index: any) => {
    if (mentionData && mentionData.data.length > 0) {
      const item = mentionData.data[index];

      if (item) {
        props.command({ id: item.id, label: item.display });
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

  useEffect(() => setSelectedIndex(0), [mentionData?.data]);

  useEffect(() => {
    debouncedGetUserForMention(props.query);
  }, [props.query]);

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

  if (isLoading) {
    return (
      <div className="w-[200px] items flex flex-col justify-center items-center">
        <Loader color="blue" />;
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[200px] items flex flex-col justify-center items-center">
        <Text className="text-mantineText">Failed to load.</Text>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-[200px] items flex flex-col">
        <ScrollArea.Autosize mah={150} scrollbars="y">
          {mentionData && mentionData?.data.length ? (
            mentionData?.data.map((item, index: any) => (
              <Button
                variant="subtle"
                color="gray"
                className={`item ${index === selectedIndex ? "is-selected" : ""}`}
                key={index}
                onClick={() => selectItem(index)}
                fullWidth
              >
                <Text className="text-mantineText cursor-pointer">{item.display}</Text>
              </Button>
            ))
          ) : (
            <div>{!isLoading && "No user"}</div>
          )}
        </ScrollArea.Autosize>
      </div>
    );
  }
});
