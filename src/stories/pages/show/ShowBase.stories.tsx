import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  DateField,
  ResourceContextProvider,
  Show,
  ShowBase,
  SimpleShowLayout,
  TextField,
  defaultI18nProvider,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import { resourceName } from "../../../ideExtension";
import { Card } from "@mui/material";


const meta = {
  title: "Pages/Show/Base",
  component: Show,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 1,
  },
  argTypes: {
    title: {
      control: "text",
    },
    emptyWhileLoading: {
      control: "boolean",
    },
    disableAuthentication: {
      control: "boolean",
    },
    queryOptions: {
      control: "text",
    },
  },
} satisfies Meta<typeof Show>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  render: ({ resource, ...props }) => {
    return (
      <ShowBase resource={resource} {...props}>
        <Card>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </SimpleShowLayout>
        </Card>
      </ShowBase>
    );
  },
  args: {
    resource: resourceName('users'),
  }
};


const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
