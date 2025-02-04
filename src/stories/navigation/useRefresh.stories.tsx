import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import {
  AdminContext,
  Button,
  defaultI18nProvider,
  Resource,
  useRefresh,
} from "react-admin";
import { delayDataProvider } from "../../dataProvider";

const meta = {
  title: "Routing/useRefresh",
  parameters: {
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof useRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const refresh = useRefresh();
    const handleClick = () => {
      refresh();
    };

    return (
      <GenerationInstructions.Exclude>
        <Button onClick={handleClick} label="Refresh"></Button>
      </GenerationInstructions.Exclude>
    );
  },
  decorators: [
    (Story: () => React.JSX.Element) => defaultDecorator(Story),
  ],
};

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
  >
    <Resource name="users" list={Story} />
  </AdminContext>
);
