import { ActionIcon, Badge, Box, Group, Menu, MenuLabel, ScrollArea, Text } from "@mantine/core";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationOption from "./NotificationOption";
import NotificationItem from "./NotificationItem";
import { useGetNotificationsQuery, useLazyGetNotificationsQuery } from "@/redux/notification/notification.api";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { GetPostData } from "@/redux/post/type";
import NotificationContainer from "./NotificationContainer";
import Link from "next/link";

const NotificationIcon = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  // const { isLoading, data, isError } = useGetNotificationsQuery(page, { refetchOnMountOrArgChange: true });
  const [hasMoreData, setHasMoreData] = useState(true);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const [getNotification, { isFetching, isLoading }] = useLazyGetNotificationsQuery();

  useEffect(() => {
    if (isAuthenticated) {
      getNotification(page)
        .unwrap()
        .then(result => {
          if (result && result.data.length < 10) {
            setHasMoreData(false);
          }
          if (result && result.data.length != 0) {
            setData([...result.data]);
          }
        });
    }
  }, [isAuthenticated]);

  const loadMoreData = async (params: any) => {
    if (!isFetching && hasMoreData) {
      if (isAuthenticated) {
        setPage(prev => prev + 1);
        return getNotification(page + 1)
          .unwrap()
          .then(result => {
            if (result.data.length < 10) {
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
    <>
      {isAuthenticated && (
        <>
          <div className="hidden lg:inline-block">
            <Menu openDelay={100} position="bottom">
              <Menu.Target>
                <Box pos={"relative"}>
                  <Box style={{ zIndex: "100" }} component="div" pos={"absolute"} top={-10} right={-10}>
                    <Badge variant="gradient" gradient={{ from: "red", to: "orange", deg: 90 }} size="lg" circle>
                      {data ? data.length : 0}
                    </Badge>
                  </Box>
                  <ActionIcon color="gray" size={"lg"} variant="danger">
                    <NotificationsNoneIcon />
                  </ActionIcon>
                </Box>
              </Menu.Target>
              <Menu.Dropdown>
                <MenuLabel>
                  <Group gap={"xs"} justify="space-between">
                    <Text className="text-mantineText" fw="800" size="lg">
                      Notification
                    </Text>
                    <NotificationOption />
                  </Group>
                </MenuLabel>

                <div className="w-[400px] h-[500px] flex flex-col">
                  {/* <ScrollArea.Autosize mah={500} scrollbars="y"> */}
                  {isLoading && <div>Loading...</div>}
                  {data ? (
                    <NotificationContainer
                      notificationData={data}
                      hasMoreData={hasMoreData}
                      loadMoreData={loadMoreData}
                    />
                  ) : (
                    <div className="w-full flex justify-center items-center text-[var(--mantine-color-text)] py-2">
                      No notification
                    </div>
                  )}
                  {/* </ScrollArea.Autosize> */}
                </div>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div className="lg:hidden">
            <Link href={`/notification`}>
              <Box pos={"relative"}>
                <Box style={{ zIndex: "100" }} component="div" pos={"absolute"} top={-10} right={-10}>
                  <Badge variant="gradient" gradient={{ from: "red", to: "orange", deg: 90 }} size="lg" circle>
                    {data ? data.length : 0}
                  </Badge>
                </Box>
                <ActionIcon color="gray" size={"lg"} variant="danger">
                  <NotificationsNoneIcon />
                </ActionIcon>
              </Box>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationIcon;
