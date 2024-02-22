import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, EmailField, Labeled, Show, SimpleShowLayout, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Blocks/Fields/EmailField",
  component: EmailField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    record: users[0]
  }
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <EmailField source={attributeName("email")} {...props} />;
  }
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      <Labeled>{Story()}</Labeled>
    </AdminContext>
  );
};
