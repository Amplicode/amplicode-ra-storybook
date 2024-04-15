import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  regex,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";
import { inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/TextInput",
  component: TextInput as any,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "name",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <TextInput source={attributeName("name")} {...props} />;
  },
};

export const CustomLabel: Story = {
  render: ({ ...props }) => {
    return <TextInput source={attributeName("name")} {...props} />;
  },
  args: {
    label: "Custom label",
  },
};

export const RequiredValidation: Story = {
  render: ({ ...props }) => {
    return (
      <TextInput
        source={attributeName("name")}
        validate={[required()]}
        {...props}
      />
    );
  },
  args: {
    label: "User name",
  },
};

export const MetaSymbolsValidation: Story = {
  render: ({ ...props }) => {
    return (
      <TextInput
        source={attributeName("name")}
        validate={regex(
          /^((?![<>#$%&]).)*$/,
          'Symbols "<>#$%&" are prohibited'
        )}
        {...props}
      />
    );
  },
  args: {
    label: "User name",
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <SimpleForm record={users[0]} mode="onChange" toolbar={false}>
        {Story()}
      </SimpleForm>
    </AdminContext>
  );
};
