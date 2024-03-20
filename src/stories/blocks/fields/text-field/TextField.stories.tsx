import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  TextField,
  Labeled,
  defaultI18nProvider,
  RecordContextProvider,
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Blocks/Fields/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <TextField source={attributeName("name")} {...props} />;
  },
};

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <RecordContextProvider value={users[0]}>
        <Labeled>{Story()}</Labeled>
      </RecordContextProvider>
    </AdminContext>
  );
};
