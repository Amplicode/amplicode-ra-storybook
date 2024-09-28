import type { Meta, StoryObj } from "@storybook/react";
import {
  DateField,
} from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/DateField",
  component: DateField,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "date"
  },
  argTypes: {
    locales: {
      control: 'text',
    },
    options: {
      control: 'text',
    },
    showTime: {
      control: 'boolean',
    },
    showDate: {
      control: 'boolean',
    },
    transform: {
      control: 'text',
    },
  }
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({source, ...props}) => {
    return <DateField source={attributeName("date")} {...props} />;
  },
};

export const Custom: Story = {
  render: ({ showTime, locales, source, ...props }) => {
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
