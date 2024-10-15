import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  CreateButton,
  Datagrid,
  DateInput,
  defaultI18nProvider,
  Edit,
  EditBase,
  Identifier,
  List,
  RaRecord,
  ResourceContextProvider,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
  useEditContext,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { WizardInfo } from "@amplicode/storybook-extensions";
import { CreatePageWizardParams } from "../../../ideExtension";
import { Box, Card, Stack, Typography } from "@mui/material";

const handleClick = () => {
  console.log("Custom action result");
};

const CustomEditActions = () => (
  <TopToolbar>
    <Button color="primary" onClick={handleClick} label="Custom Action" />
  </TopToolbar>
);

const CustomEditAside = () => (
  <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
    <Stack spacing={2}>
      <Typography variant="h6">Aside content</Typography>
      <Typography>Additional aside content</Typography>
    </Stack>
  </Box>
);

const editRedirectFunc = (
  resource?: string,
  id?: Identifier,
) => {
  return `/redirect/to/${resource}/${id}`;
};

const createTransformFunc = (record: any) => ({...record});

const meta = {
  title: "Pages/Edit/Base",
  component: Edit,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 2,
  },
  argTypes: {
    redirect: {
      control: "select",
      options: ["list", "edit", "show", "disable", "redirectToFunction"],
      mapping: {
        list: "list",
        show: "show",
        disable: false,
        redirectToFunction: editRedirectFunc,
      },
    },
    disableAuthentication: {
      control: 'boolean'
    },
    mutationMode: {
      control: "select",
      options: ["pessimistic", "optimistic", "undoable"]
    },
    mutationOptions: {
      control: "text"
    },
    transform: {
        control: "select",
        options: ["default", "transformFunction"],
        mapping: {
            default: undefined,
            transformFunction: createTransformFunc,
        },
    },
  },
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
    return (
      <EditBase resource={"users"} {...props}>
        <Card sx={{width: 300}}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
        </Card>
      </EditBase>
    );
  },

  wizardName: "pageWizard",
  info: {
    pageType: "Edit",
    readonlyPageType: true,
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
