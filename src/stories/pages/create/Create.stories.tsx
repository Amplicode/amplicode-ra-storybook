import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    Button,
    Create,
    DateInput,
    defaultI18nProvider,
    required,
    ResourceContextProvider,
    SimpleForm,
    TextInput,
    TopToolbar,
    useSaveContext,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { dataProvider } from "../../../dataProvider";
import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { CreatePageWizardInfo, WizardInfo } from "@amplicode/storybook-extensions";

const meta = {
    title: "Pages/Create",
    component: Create as any,
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof Create>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story & WizardInfo<CreatePageWizardInfo> = {
  render: (props) => {
    return (
      <Create {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="birthday" />
        </SimpleForm>
      </Create>
    );
  },

  wizardName: 'pageWizard',
  info: {
    pageType: 'Create',
    readonlyPageType: true,
  }
};

export const CustomActions: Story = {
    render: (props) => {
        const handleClick = () => {
            alert('Custom action result');
        }

        const CustomActions = () => (
            <TopToolbar>
                <Button color="primary" onClick={handleClick} label="Custom Action"/>
            </TopToolbar>
        );

        return (
            <Create actions={<CustomActions/>} {...props}>
                <SimpleForm>
                    <TextInput source="id"/>
                    <TextInput source="name"/>
                    <DateInput source="birthday"/>
                </SimpleForm>
            </Create>
        );
    },
};

export const Aside: Story = {
    render: (props) => {
        const Aside = () => (
            <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Aside content</Typography>
                    <Typography>Additional aside content</Typography>
                </Stack>
            </Box>
        );

        return (
            <Create aside={<Aside/>} {...props}>
                <SimpleForm>
                    <TextInput source="id"/>
                    <TextInput source="name"/>
                    <DateInput source="birthday"/>
                </SimpleForm>
            </Create>
        );
    },
};

export const CreateDialog: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        const MyForm = () => {
            let {
                save,
            } = useSaveContext();

            const onSubmit = async (values: FieldValues) => {
                if (save) {
                    await save(values, {
                        onSuccess: () => setOpen(false),
                    });
                }
            };

            return <SimpleForm onSubmit={onSubmit}>
                <TextInput source="id"/>
                <TextInput source="name" validate={required()}/>
                <DateInput source="birthday"/>
            </SimpleForm>;
        };

        return (
            <>
                <Button onClick={() => setOpen(true)} label="Open Dialog"/>

                <Dialog open={open}>
                    <DialogTitle>Create User</DialogTitle>
                    <Create>
                        <MyForm/>
                    </Create>
                </Dialog>
            </>
        );
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextProvider value="users">
            <Story/>
        </ResourceContextProvider>
    </AdminContext>
);
