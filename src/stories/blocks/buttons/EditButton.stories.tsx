import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  EditButton,
  defaultI18nProvider,
  ResourceContextProvider,
  RecordContextProvider,
} from "react-admin";
import React from "react";
import { AnyPropsComponent } from "../../../utils";
import { dataProvider, users } from "../../../dataProvider";

const meta = {
  title: "Buttons/EditButton",
  component: AnyPropsComponent,
  args: {
    label: "Edit",
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
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <EditButton {...props} />;
  },
};

export const Outlined: Story = {
  render: ({ ...props }) => {
    return <EditButton {...props} />;
  },
  args: {
    variant: "outlined",
  },
};

export const Filled: Story = {
  render: ({ ...props }) => {
    return <EditButton {...props} />;
  },
  args: {
    variant: "contained",
  },
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
