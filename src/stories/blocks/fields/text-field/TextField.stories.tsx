import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "city",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <TextField source={attributeName("city")} {...props} />;
  },
};
