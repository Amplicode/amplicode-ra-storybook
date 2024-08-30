import type { Meta, StoryObj } from "@storybook/react";
import { FileField } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/FileField",
  component: FileField,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "url",
    title: "Presentation",
  }
} satisfies Meta<typeof FileField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({...props}) => {
    return <FileField source={attributeName("url")} {...props} />;
  },
};
