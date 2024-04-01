import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, FunctionField, Labeled, RecordContextProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Fields/FunctionField",
  component: FunctionField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof FunctionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({...props}) => {
    return <FunctionField source={attributeName("name")} render={(record: any) => {
      return (
          <div>Custom render: {record.name}</div>
      )
    }} {...props} />;
  }
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      <RecordContextProvider value={users[0]}>
        <Labeled>{Story()}</Labeled>
      </RecordContextProvider>
    </AdminContext>
  );
};
