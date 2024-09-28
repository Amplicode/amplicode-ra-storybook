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
  },
  argTypes: {
    src: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    target: {
      control: 'text'
    },
    download: {
      control: 'text'
    },
    ping: {
      control: 'text'
    },
    rel: {
      control: 'text'
    },
  },
} satisfies Meta<typeof FileField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <FileField source={attributeName("url")} {...props} />;
  },
};
