import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  ShowButton,
  defaultI18nProvider,
  ResourceContextProvider,
  RecordContextProvider,
} from "react-admin";
import React from "react";
import { dataProvider, users } from "../../../dataProvider";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
  title: "Buttons/ShowButton",
  component: ShowButton,
  args: {
    label: "Show",
  },
  argTypes: {
    label: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["text", "outlined", "contained"],
    },
    icon: {
      control: "text",
    },
    scrollToTop: {
      control: "boolean",
    },
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof ShowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <ShowButton {...props} />;
  },
};

export const Outlined: Story = {
  render: ({ ...props }) => {
    return <ShowButton {...props} />;
  },
  args: {
    variant: "outlined",
  },
};

export const Filled: Story = {
  render: ({ ...props }) => {
    return <ShowButton {...props} />;
  },
  args: {
    variant: "contained",
  },
};

export const WithState: Story = {
  name: "Edit with predefined record attributes",
  render: ({ ...props }) => {
    return <ShowButton {...props} />;
  },
  args: {
    state: replaceOnGenerate(
      {},
      {
        record: {
          /*default record*/
        },
      }
    ),
  },
  decorators: [(Story) => <Story />],
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <ResourceContextProvider value={"users"}>
        <RecordContextProvider value={users[0]}>
          <Story />
        </RecordContextProvider>
      </ResourceContextProvider>
    </AdminContext>
  );
};
