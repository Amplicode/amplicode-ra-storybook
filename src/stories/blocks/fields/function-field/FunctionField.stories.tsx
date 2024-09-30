import type { Meta, StoryObj } from "@storybook/react";
import { FunctionField } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { fieldDecorators } from "../fieldDecorators";

const meta = {
  title: "Fields/FunctionField",
  component: FunctionField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [...fieldDecorators],
  args: {
    source: "name",
  },
  argTypes: {
    render: {
      control: "text",
    },
    label: {
      control: "text"
    }
  },
} satisfies Meta<typeof FunctionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    const createFunctionRender = (record: any) => {
      return (
        <div>
          Custom render: {record.role} {record.name}
        </div>
      );
    };

    return (
      <FunctionField
        source={attributeName("name")}
        render={createFunctionRender}
        {...props}
      />
    );
  },
};
