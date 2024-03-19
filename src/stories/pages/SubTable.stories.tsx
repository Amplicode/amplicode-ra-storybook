import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    CreateButton,
    Datagrid,
    DateField,
    defaultI18nProvider,
    Edit,
    Labeled,
    List,
    ResourceContextProvider,
    Show,
    SimpleForm,
    TextField,
    useShowContext,
} from "react-admin";
import { dataProvider } from "../../dataProvider";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import Typography from "@mui/material/Typography";
import { attributeName, resourceName } from "../../ideExtension";
import Box from "@mui/material/Box";

const meta = {
    title: "Pages/SubTable",
    component: Edit as any,
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        id: 2
    },
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: ({ subresourceName, subresourceBackReference, ...props }) => {
        const SubTable = () => {
            const { record } = useShowContext(); // replace with useEditContext for Edit screens

            if (!record) {
                return <></>;
            }

            return (
                <List
                    disableSyncWithLocation
                    resource={subresourceName}
                    filter={{
                        [subresourceBackReference]: record.id
                    }}
                    sx={{ width: "100%" }}
                    actions={
                        <CreateButton state={{ record: { [subresourceBackReference]: record.id } }}/>
                    }
                    {...props}
                >
                    <Datagrid>
                        <TextField source="id"/>
                        <GenerationInstructions.Exclude>
                            <TextField source="name"/>
                            <DateField source="birthday"/>
                        </GenerationInstructions.Exclude>
                    </Datagrid>
                </List>
            );
        };


        return (
            <Show resource='departments'>
                <SimpleForm>
                    <Typography variant="h5">Department</Typography>

                    <Labeled>
                        <TextField source="id"/>
                    </Labeled>

                    <Labeled>
                        <TextField source="name"/>
                    </Labeled>

                    <GenerationInstructions.InsertOnly>
                        <Box sx={{ width: "100%" }}>
                            <SubTable/>
                        </Box>
                    </GenerationInstructions.InsertOnly>
                </SimpleForm>
            </Show>
        );
    },
    args: {
        subresourceName: resourceName("users", {
            title: 'Child Resource',
            resourceId: 'subresource',
            allowContext: false,
        }),
        subresourceBackReference: attributeName("department_id",
            {
                resourceId: 'subresource',
                attributeSelectTitle: 'Child Resource Reference Attribute'
            }
        )
    }
};


const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextProvider value="departments">
            <Story/>
        </ResourceContextProvider>
    </AdminContext>
);
