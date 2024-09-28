import type { Meta, StoryObj } from "@storybook/react";
import { maxValue, minValue, NumberInput } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/NumberInput",
  component: NumberInput,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "day_offs",
  },
  argTypes: {
    label: {
      control: "text",
    },
    max: {
      control: "number",
    },
    min: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <NumberInput source={attributeName("day_offs")} {...props} />;
  },
};

export const CustomLabel: Story = {
  render: ({ source, ...props }) => {
    return <NumberInput source={attributeName("day_offs")} {...props} />;
  },
  args: {
    label: "User day offs",
  },
};

export const MinAndMaxValidation: Story = {
  render: ({ source, ...props }) => {
    return (
      <NumberInput
        source={attributeName("day_offs")}
        min={0}
        max={10}
        validate={[
          minValue(0, "Must be at least 0"),
          maxValue(10, "Must be 10 or less"),
        ]}
        {...props}
      />
    );
  },
  args: {
    label: "User day offs",
  },
};
