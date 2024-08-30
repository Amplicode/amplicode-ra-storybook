import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, FunctionField, Labeled, RecordContextProvider, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/FunctionField",
  component: FunctionField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [
    ...fieldDecorators,
  ],
  args: {
    source: "name"
  },
} satisfies Meta<typeof FunctionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    const createFunctionRender = (record: any) => {
      return (
        <div>Custom render: {record.role} {record.name}</div>
      )
    };

    return <FunctionField source={attributeName("name")} render={createFunctionRender} {...props} />;
  }
};
