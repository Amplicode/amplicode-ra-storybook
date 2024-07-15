import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  NumberField,
  Labeled,
  defaultI18nProvider,
  RecordContextProvider,
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Blocks/Fields/NumberField",
  component: NumberField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [
    ...fieldDecorators,
  ],
  args: {
    source: "day_offs"
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <NumberField source={attributeName("day_offs")} {...props} />;
  },
};

export const Currency: Story = {
  render: ({currency, ...props}) => {
    return <NumberField source={attributeName("day_offs")} options={{style: 'currency', currency: currency}} {...props} />;
  },
  args: {
    currency: 'USD'
  },
  argTypes: {
    currency: {
      options: ['USD', 'EUR'],
      control: { type: 'select' },
    }
  }
};

export const Unit: Story = {
  render: ({unit, unitDisplay, ...props}) => {
    return <NumberField source={attributeName("day_offs")} options={{style: 'unit', unit: unit, unitDisplay: unitDisplay}} {...props} />;
  },
  args: {
    unit: 'liter',
    unitDisplay: 'short'
  },
  argTypes: {
    unit: {
      options: ['liter', 'gallon', 'kilometer'],
      control: { type: 'select' },
    },
    unitDisplay: {
      options: ['short', 'narrow', 'long'],
      control: { type: 'select' },
    }
  }
};
