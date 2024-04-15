import type { Meta, StoryObj } from "@storybook/react";
import {
  DateField,
} from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Blocks/Fields/DateField",
  component: DateField,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "date"
  }
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <DateField source={attributeName("date")} {...props} />;
  },
};

export const Custom: Story = {
  render: ({ showTime, locales, ...props }) => {
    return (
      <DateField
        source={attributeName("date")}
        showTime={showTime}
        locales={locales}
        {...props}
      />
    );
  },
  args: {
    showTime: true,
    locales: "en-US",
  },
  argTypes: {
    locales: {
      options: ["fr-FR", "en-US"],
      control: { type: "select" },
    },
  },
};
