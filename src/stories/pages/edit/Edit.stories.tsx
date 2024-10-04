import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  CreateButton,
  Datagrid,
  DateInput,
  defaultI18nProvider,
  Edit,
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
import { Box, Stack, Typography } from "@mui/material";

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

const meta = {
  title: "Pages/Edit",
  component: Edit,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 2,
  },
  argTypes: {
    title: {
      control: "text",
    },
    actions: {
      control: "select",
      options: ["default", "customActions"],
      mapping: {
        default: undefined,
        customActions: <CustomEditActions />,
      },
    },
    aside: {
      control: "select",
      options: ["default", "createAside"],
      mapping: {
        default: undefined,
        createAside: <CustomEditAside />,
      },
    },
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
    }
  },
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
    return (
      <Edit resource={"users"} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Edit>
    );
  },

  wizardName: "pageWizard",
  info: {
    pageType: "Edit",
    readonlyPageType: true,
  },
};

export const CustomActions: Story = {
  render: ({ ...props }) => {
    return (
      <Edit actions={<CustomEditActions />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Edit>
    );
  },
};

export const Aside: Story = {
  render: ({ ...props }) => {
    return (
      <Edit aside={<CustomEditAside />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Edit>
    );
  },
};

export const SubResource: Story = {
  render: ({ ...props }) => {
    const TasksTable = () => {
      const { record: user } = useEditContext();

      if (!user) return <></>;

      return (
        <List
          resource="tasks"
          filter={{ user_id: user.id }}
          actions={
            <>
              <CreateButton state={{ record: { user_id: user.id } }} />
            </>
          }
        >
          <Datagrid>
            <TextField source="name" />
          </Datagrid>
        </List>
      );
    };

    return (
      <Edit resource="users" {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />

          <TasksTable />
        </SimpleForm>
      </Edit>
    );
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
