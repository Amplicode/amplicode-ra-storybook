import type { Meta, StoryObj } from "@storybook/react";
import { EmailField } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/EmailField",
  component: EmailField,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "email",
  }
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <EmailField source={attributeName("email")} {...props} />;
  }
};
