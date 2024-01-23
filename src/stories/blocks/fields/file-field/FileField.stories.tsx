import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, FileField, Labeled, Show, SimpleShowLayout, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";

const meta = {
  title: "Blocks/Fields/FileField",
  component: FileField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof FileField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <FileField source="name" title="Presentation" {...{...props, record: users[0]}}/>;
  }
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      {Story()}
    </AdminContext>
  );
};
