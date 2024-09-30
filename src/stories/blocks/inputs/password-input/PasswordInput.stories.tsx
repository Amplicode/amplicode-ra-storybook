import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "react-admin";
import { inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "password",
    initiallyVisible: false
  },
  argTypes: {
    initiallyVisible: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <PasswordInput source={"password"} {...props} />;
  },
};

export const DisableAutocomplete: Story = {
  render: ({ source, ...props }) => {
    return (
      <PasswordInput
        source={"password"}
        {...props}
      />
    );
  }
};