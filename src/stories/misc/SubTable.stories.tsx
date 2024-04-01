import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    CreateButton,
    Datagrid,
    defaultI18nProvider,
    Labeled,
    List,
    RecordContextProvider,
    ResourceContextProvider,
    Show,
    SimpleShowLayout,
    TextField,
    useRecordContext,
} from "react-admin";
import { dataProvider, departments } from "../../dataProvider";
import React from "react";
import { GenerationInstructions, topLevel } from "@amplicode/storybook-extensions";
import Typography from "@mui/material/Typography";
import { attributeName, resourceName } from "../../ideExtension";
import { AnyPropsComponent } from "../../utils";

const meta = {
    title: "Misc/SubTable",
    component: AnyPropsComponent,
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: ({ subresourceName, subresourceBackReference, ...props }) => {
        const SubTable = topLevel(() => {
                const record = useRecordContext();
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
                        title={<span/>}
                    >
                        <GenerationInstructions.Exclude>
                            <Typography variant="h6">Department users</Typography>
                        </GenerationInstructions.Exclude>
                        <Datagrid>
                            <TextField source="id"/>
                            {/*  use 'field' completion to generate other fields  */}
                        </Datagrid>
                    </List>
                );
            }
        );


        return (
            <Show resource='departments' id={2}>
                <SimpleShowLayout>
                    <Typography variant="h5">Department</Typography>

                    <Labeled>
                        <TextField source="id"/>
                    </Labeled>

                    <Labeled>
                        <TextField source="name"/>
                    </Labeled>
                </SimpleShowLayout>

                <GenerationInstructions.InsertOnly>
                    <SubTable/>
                </GenerationInstructions.InsertOnly>
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
                attributeSelectTitle: 'Reference Attribute from Child Resource to Main Resource'
            }
        )
    }
};


const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextProvider value="departments">
            <RecordContextProvider value={departments[2]}>
                <Story/>
            </RecordContextProvider>
        </ResourceContextProvider>
    </AdminContext>
);
