import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  TextField,
  Labeled,
  defaultI18nProvider,
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";

const meta = {
  title: "Blocks/Fields/TextField",
  component: TextField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    record: users[0],
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <TextField source="name" {...props} />;
  },
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <Labeled><Story/></Labeled>
    </AdminContext>
  );
};
