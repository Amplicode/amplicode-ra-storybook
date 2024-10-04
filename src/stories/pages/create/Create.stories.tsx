import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  Create,
  DateInput,
  defaultI18nProvider,
  Identifier,
  RaRecord,
  required,
  ResourceContextProvider,
  SimpleForm,
  TextInput,
  TopToolbar,
  useSaveContext,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React, { useState } from "react";
import { Box, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { WizardInfo } from "@amplicode/storybook-extensions";
import { CreatePageWizardParams } from "../../../ideExtension";

const createRedirectFunc = (
  resource?: string,
  id?: Identifier,
) => {
  return `/redirect/to/${resource}/${id}`;
};

const handleClick = () => {
  console.log("Custom action result");
};

const CreateActions = () => {
  return (
    <TopToolbar>
      <Button color="primary" onClick={handleClick} label="Custom Action" />
    </TopToolbar>
  )
};

const CreateAside = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Aside content</Typography>
        <Typography>Additional aside content</Typography>
      </Stack>
    </Box>
  )
};

const meta = {
  title: "Pages/Create",
  component: Create as any,
  decorators: [(Story) => defaultDecorator(Story)],
  argTypes: {
    title: {
      control: "text",
    },
    actions: {
      control: "select",
      options: ["default", "customActions"],
      mapping: {
        default: undefined,
        customActions: <CreateActions />,
      },
    },
    aside: {
      control: "select",
      options: ["default", "createAside"],
      mapping: {
        default: undefined,
        createAside: <CreateAside />,
      },
    },
    redirect: {
      control: "select",
      options: ["list", "edit", "show", "disable", "redirectToFunction"],
      mapping: {
        list: "list",
        show: "show",
        disable: false,
        redirectToFunction: createRedirectFunc,
      },
    },
    disableAuthentication: {
      control: 'boolean'
    },
    mutationOptions: {
      control: "text"
    }
  },
} satisfies Meta<typeof Create>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
    return (
      <Create {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Create>
    );
  },

  wizardName: "pageWizard",
  info: {
    pageType: "Create",
    readonlyPageType: true,
  },
};

export const CustomActions: Story = {
  render: ({ ...props }) => {
    return (
      <Create actions={<CreateActions />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Create>
    );
  },
};

export const Aside: Story = {
  render: ({ ...props }) => {
    return (
      <Create aside={<CreateAside />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
      </Create>
    );
  },
};

export const CreateDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const MyForm = () => {
      let { save } = useSaveContext();

      const onSubmit = async (values: FieldValues) => {
        if (save) {
          await save(values, {
            onSuccess: () => setOpen(false),
          });
        }
      };

      return (
        <SimpleForm onSubmit={onSubmit}>
          <TextInput source="id" />
          <TextInput source="name" validate={required()} />
          <DateInput source="date" />
        </SimpleForm>
      );
    };

    return (
      <>
        <Button onClick={() => setOpen(true)} label="Open Dialog" />

        <Dialog open={open} fullWidth maxWidth="xs">
          <DialogTitle>Create User</DialogTitle>
          <Create>
            <MyForm />
          </Create>
        </Dialog>
      </>
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
