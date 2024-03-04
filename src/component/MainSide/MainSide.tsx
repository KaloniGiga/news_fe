"use client";
import Image from "next/image";
import MainTabs from "./MainTabs";
import { Avatar, CircularProgress } from "@mui/material";
import MainDescription from "./MainDescription";
import {
  useGetAuthUserCreatePostQuery,
  useGetCreatePostQuery,
  useGetPostQuery,
  useLazyGetAuthUserCreatePostQuery,
  useLazyGetCreatePostQuery,
  useSearchCategoryQuery,
} from "@/redux/post/post.api";
import { Box, Center, Text } from "@mantine/core";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { useEffect, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import NewsCardList from "./NewsCard/NewsCardList";
import { useSearchParams } from "next/navigation";

const MainSide = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const isAuthenticated = useAppSelector(selectAuthenticated);

  const [getCreatePost, { isFetching: createPostFetching }] = useLazyGetCreatePostQuery();
  const [getAuthCreatePost, { isFetching: authCreatePostFetching }] = useLazyGetAuthUserCreatePostQuery();

  const search = useSearchParams();
  const searchVal = search.get("category");
  const user = useAppSelector(selectUser);

  const { data: catPostData, isLoading: catPostLoading } = useSearchCategoryQuery(searchVal ? searchVal : "");

  useEffect(() => {
    if (isAuthenticated) {
      getAuthCreatePost(page)
        .unwrap()
        .then(result => {
          if (result && result.data.length < 5) {
            setHasMoreData(false);
          }

          if (result && result.data.length != 0) {
            setData(prev => [...prev, ...result.data]);
          }
        });
    } else {
      getCreatePost(page)
        .unwrap()
        .then(result => {
          if (result && result.data.length < 5) {
            setHasMoreData(false);
          }
          if (result && result.data.length != 0) {
            setData(prev => [...prev, ...result.data]);
          }
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (searchVal && catPostData) {
      setData(catPostData?.data);
    }
  }, [searchVal, catPostData]);

  const loadMoreData = async (params: any) => {
    if (!createPostFetching && !authCreatePostFetching) {
      if (isAuthenticated) {
        setPage(prev => prev + 1);
        return getAuthCreatePost(page + 1)
          .unwrap()
          .then(result => {
            if (result.data.length < 5) {
              setHasMoreData(false);
            }
            if (result.data.length != 0) {
              setData(prev => [...prev, ...result.data]);
            }
          });
      } else {
        setPage(prev => prev + 1);
        return getCreatePost(page + 1)
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
    }
  };

  return (
    data && (
      <Box component="div" className="w-full h-full text-mantineText">
        <NewsCardList newsPostData={data} hasMoreData={hasMoreData} loadMoreData={loadMoreData} />
      </Box>
    )
  );
};

export default MainSide;
