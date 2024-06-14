import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  maxValue,
  minValue,
  NumberInput,
  SimpleForm,
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";
import { inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/NumberInput",
  component: NumberInput as any,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "day_offs",
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <NumberInput source={attributeName("day_offs")} {...props} />;
  },
};

export const CustomLabel: Story = {
  render: ({ ...props }) => {
    return <NumberInput source={attributeName("day_offs")} {...props} />;
  },
  args: {
    label: "User day offs",
  },
};

export const MinAndMaxValidation: Story = {
  render: ({ ...props }) => {
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

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <SimpleForm record={users[0]} mode="onChange" toolbar={false}>
        {Story()}
      </SimpleForm>
    </AdminContext>
  );
};
