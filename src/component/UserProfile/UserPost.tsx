"use client";
import { useLazyGetUserCreatePostQuery } from "@/redux/post/post.api";
import { useEffect, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import CreatePostList from "../MainSide/NewsCard/CreatePostList";

const UserPost = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [getUserCreatePost, { isFetching }] = useLazyGetUserCreatePostQuery();

  useEffect(() => {
    getUserCreatePost(page)
      .unwrap()
      .then(result => {
        if (result && result.data.length < 5) {
          setHasMoreData(false);
        }

        if (result && result.data.length != 0) {
          setData([...result.data]);
        }
      });
  }, []);

  const loadMoreData = async (params: any) => {
    if (!isFetching) {
      setPage(prev => prev + 1);
      return getUserCreatePost(page + 1)
        .unwrap()
        .then(result => {
          if (result.data.length < 5) {
            setHasMoreData(false);
          }

          if (result.data.length != 0) {
            setData(prev => [...prev, ...result.data]);
          }
        });
    }
  };
  return data && <CreatePostList loadMoreData={loadMoreData} hasMoreData={hasMoreData} newsPostData={data} />;
};

export default UserPost;
