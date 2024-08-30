import type { Meta, StoryObj } from "@storybook/react";
import { BooleanField } from "react-admin";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/BooleanField",
  component: BooleanField,
  parameters: {
    layout: "centered",
  },
  decorators: [
    ...fieldDecorators,
  ],
  args: {
    source: "active"
  },
} satisfies Meta<typeof BooleanField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <BooleanField source={attributeName("active")} {...props} />;
  },
};

export const Custom: Story = {
  render: ({ valueLabelTrue, valueLabelFalse, ...props }) => {
    return (
      <BooleanField
        source={attributeName("active")}
        valueLabelTrue={valueLabelTrue}
        valueLabelFalse={valueLabelFalse}
        title={"Active"}
        {...props}
      />
    );
  },
  args: {
    valueLabelTrue: "User is active",
    valueLabelFalse: "User is banned",
    TrueIcon: AlarmOnIcon,
    FalseIcon: AlarmOffIcon,
  },
  argTypes: {
    TrueIcon: {
      options: ["AlarmOnIcon", "AlarmOffIcon"],
      mapping: {
        AlarmOnIcon: AlarmOnIcon,
        AlarmOffIcon: AlarmOffIcon,
      },
    },
    FalseIcon: {
      options: ["AlarmOnIcon", "AlarmOffIcon"],
      mapping: {
        AlarmOnIcon: AlarmOnIcon,
        AlarmOffIcon: AlarmOffIcon,
      },
    },
  },
};
