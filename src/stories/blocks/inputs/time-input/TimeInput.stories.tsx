import type { Meta, StoryObj } from "@storybook/react";
import {
  TimeInput,
  NumberInput,
} from "react-admin";
import { inputDecorators } from "../inputDecorators";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Inputs/TimeInput",
  component: TimeInput,
  parameters: {
    // layout: "centered",
    controls: {
      exclude: ["source", "fullWidth", "helperText", "parse", "validate"],
    },
  },
  decorators: [...inputDecorators],
  args: {
    source: "time",
  },
  argTypes: {
    fullWidth: {
      control: "boolean",
    },
    helperText: {
      control: "text",
    },
    parse: {
      control: "text",
    },
    validate: {
      control: "text",
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <TimeInput source={attributeName("time")} {...props} />;
  },
};
