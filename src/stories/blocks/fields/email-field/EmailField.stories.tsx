import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, EmailField, Labeled, RecordContextProvider, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Fields/EmailField",
  component: EmailField,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({...props}) => {
    return <EmailField source={attributeName("email")} {...props} />;
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
