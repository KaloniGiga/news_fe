"use client";
import {
  useLazyGetAuthUserCreatePostQuery,
  useLazyGetCreatePostQuery,
  useSearchCategoryQuery,
} from "@/redux/post/post.api";
import { Box } from "@mantine/core";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { useEffect, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import NewsCardList from "./NewsCard/NewsCardList";
import { useSearchParams } from "next/navigation";
import CreatePostSkeletonContainer from "../Skeleton/CreatePostSkeleton/CreatePostSkeletonContainer";

const MainSide = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const isAuthenticated = useAppSelector(selectAuthenticated);

  const [
    getCreatePost,
    { isLoading: createPostLoading, isFetching: createPostFetching, isSuccess: createPostSuccess },
  ] = useLazyGetCreatePostQuery();
  const [
    getAuthCreatePost,
    { isLoading: authCreatePostLoading, isFetching: authCreatePostFetching, isSuccess: authCreatePostSuccess },
  ] = useLazyGetAuthUserCreatePostQuery();

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
            setData([...result.data]);
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
            setData([...result.data]);
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

  if (createPostLoading || authCreatePostLoading) {
    return <CreatePostSkeletonContainer />;
  }

  if (createPostSuccess || authCreatePostSuccess) {
    return (
      data && (
        <Box component="div" className="w-full h-full text-mantineText">
          <NewsCardList newsPostData={data} hasMoreData={hasMoreData} loadMoreData={loadMoreData} />
        </Box>
      )
    );
  }
};

export default MainSide;
