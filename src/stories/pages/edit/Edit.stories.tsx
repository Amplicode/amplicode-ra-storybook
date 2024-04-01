import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    Button,
    CreateButton,
    Datagrid,
    DateInput,
    defaultI18nProvider,
    Edit,
    List,
    ResourceContextProvider,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar,
    useEditContext,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { CreatePageWizardParams } from "ideExtension";
import { WizardInfo } from "@amplicode/storybook-extensions";

const meta = {
    title: "Pages/Edit",
    component: Edit as any,
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        id: 2
    },
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({...props}) => {
    return (
      <Edit resource={'users'} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="birthday" />
        </SimpleForm>
      </Edit>
    );
  },

  wizardName: 'pageWizard',
  info: {
    pageType: 'Edit',
    readonlyPageType: true,
  }
};

export const CustomActions: Story = {
    render: ({...props}) => {
        const handleClick = () => {
            alert("Custom action result");
        };

        const CustomActions = () => (
            <TopToolbar>
                <Button color="primary" onClick={handleClick} label="Custom Action"/>
            </TopToolbar>
        );

        return (
            <Edit actions={<CustomActions/>} {...props}>
                <SimpleForm>
                    <TextInput source="id"/>
                    <TextInput source="name"/>
                    <DateInput source="birthday"/>
                </SimpleForm>
            </Edit>
        );
    },
};

export const Aside: Story = {
    render: ({...props}) => {
        const Aside = () => (
            <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Aside content</Typography>
                    <Typography>Additional aside content</Typography>
                </Stack>
            </Box>
        );

        return (
            <Edit aside={<Aside/>} {...props}>
                <SimpleForm>
                    <TextInput source="id"/>
                    <TextInput source="name"/>
                    <DateInput source="birthday"/>
                </SimpleForm>
            </Edit>
        );
    },
};

export const SubResource: Story = {
    render: ({...props}) => {

        const TasksTable = () => {
            const { record: user } = useEditContext();

            if (!user) return <></>;

            return <List resource="tasks"
                         filter={{ user_id: user.id }}
                         actions={<><CreateButton state={{ record: { user_id: user.id } }}/></>}>
                <Datagrid>
                    <TextField source="name"/>
                </Datagrid>
            </List>;
        };

        return <Edit resource='users' {...props}>
            <SimpleForm>
                <TextInput source="id"/>
                <TextInput source="name"/>
                <DateInput source="birthday"/>

                <TasksTable/>
            </SimpleForm>
        </Edit>;
    }
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextProvider value="users">
            <Story/>
        </ResourceContextProvider>
    </AdminContext>
);
