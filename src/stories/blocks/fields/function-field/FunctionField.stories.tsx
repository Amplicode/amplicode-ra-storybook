import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, FunctionField, Labeled, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";

const meta = {
  title: "Blocks/Fields/FunctionField",
  component: FunctionField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    record: users[0]
  }
} satisfies Meta<typeof FunctionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    const render = (record: any) => {
      return (
        <div>Custom render: {record.name}</div>
      )
    }

    return <FunctionField source="name" render={render} {...props} />;
  }
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      <Labeled>{Story()}</Labeled>
    </AdminContext>
  );
};
