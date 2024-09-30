import type { Meta, StoryObj } from "@storybook/react";
import {
  NumberField,
} from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/NumberField",
  component: NumberField as any,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ['locales', 'options', 'transform', 'source']
    }
  },
  decorators: [...fieldDecorators],
  args: {
    source: "day_offs",
  },
  argTypes: {
    locales: {
      control: 'text',
    },
    options: {
      control: 'text',
    },
    transform: {
      control: 'text',
    }
  }
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({source, ...props}) => {
    return <NumberField source={attributeName("day_offs")} {...props} />;
  },
};

export const Currency: Story = {
  render: ({ currency, source, ...props }) => {
    return (
      <NumberField
        source={attributeName("day_offs")}
        options={{ style: "currency", currency: currency }}
        {...props}
      />
    );
  },
  args: {
    currency: "USD",
  },
  argTypes: {
    currency: {
      options: ["USD", "EUR"],
      control: { type: "select" },
    },
  }
};

export const Unit: Story = {
  render: ({ unit, unitDisplay, source, ...props }) => {
    return (
      <NumberField
        source={attributeName("day_offs")}
        options={{ style: "unit", unit: unit, unitDisplay: unitDisplay }}
        {...props}
      />
    );
  },
  args: {
    unit: "liter",
    unitDisplay: "short",
  },
  argTypes: {
    unit: {
      options: ["liter", "gallon", "kilometer"],
      control: { type: "select" },
    },
    unitDisplay: {
      options: ["short", "narrow", "long"],
      control: { type: "select" },
    },
  }
};
