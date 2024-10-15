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
import { WizardInfo } from "@amplicode/storybook-extensions";
import { CreatePageWizardParams } from "../../../ideExtension";
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

export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
    return (
      <ShowBase {...props}>
        <Card sx={{width: 300}}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </SimpleShowLayout>
        </Card>
      </ShowBase>
    );
  },

  wizardName: "pageWizard",
  info: {
    pageType: "Show",
    readonlyPageType: true,
  },
};


const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
