import { Card, Stack, Text } from "@mantine/core";
import AccountSettings from "./AccountSettings";
import CategoryContainer from "../ChooseCategory/CategoryContainer";

const AccountSettingsContainer = () => {
  return (
    <div className="w-full mb-8">
      <Card withBorder radius={"md"} p={"lg"} className="w-full">
        <Stack>
          <Text my={"xs"} size="xl" fw={700}>
            Account Settings
          </Text>
          <AccountSettings />

          <Text size="lg" fw={700}>
            Change Category Preference
          </Text>
          <CategoryContainer />
        </Stack>
      </Card>
    </div>
  );
};

export default AccountSettingsContainer;
