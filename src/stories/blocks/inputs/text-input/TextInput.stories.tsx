import type { Meta, StoryObj } from "@storybook/react";
import { regex, required, TextInput } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/TextInput",
  component: TextInput,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "name",
  },
  argTypes: {
    multiline: {
      control: "boolean",
    },
    resettable: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: [
        "password",
        "search",
        "tel",
        "text",
      ],
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <TextInput source={attributeName("name")} {...props} />;
  },
};

export const CustomLabel: Story = {
  render: ({ source, ...props }) => {
    return <TextInput source={attributeName("name")} {...props} />;
  },
  args: {
    label: "Custom label",
  },
};

export const RequiredValidation: Story = {
  render: ({ source, ...props }) => {
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
  render: ({ source, ...props }) => {
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
