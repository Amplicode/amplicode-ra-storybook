import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  CreateButton,
  defaultI18nProvider,
  ResourceContextProvider,
} from "react-admin";
import React from "react";
import { dataProvider } from "../../../dataProvider";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
  title: "Buttons/CreateButton",
  component: CreateButton,
  args: {
    label: "Create",
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
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <CreateButton {...props} />;
  },
};

export const Outlined: Story = {
  render: ({ ...props }) => {
    return <CreateButton {...props} />;
  },
  args: {
    variant: "outlined",
  },
};

export const Filled: Story = {
  render: ({ ...props }) => {
    return <CreateButton {...props} />;
  },
  args: {
    variant: "contained",
  },
};

export const WithState: Story = {
  name: "Create with predefined record attributes",
  render: ({ ...props }) => {
    return <CreateButton {...props} />;
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
        <Story />
      </ResourceContextProvider>
    </AdminContext>
  );
};
