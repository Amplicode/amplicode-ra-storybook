import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    BooleanInput,
    Datagrid,
    DateInput,
    defaultI18nProvider,
    Identifier,
    List,
    NumberInput,
    ReferenceInput,
    Resource,
    SimpleForm,
    TextField,
    TextInput,
    useGetOne,
    useListContext,
    useResourceDefinitionContext,
    useUpdate,
    WithListContext,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { ListControllerResult } from "ra-core/src/controller/list/useListController";
import { FieldValues } from "react-hook-form";

const meta = {
    title: "Pages/MasterDetails",
    component: List as any,
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        perPage: 5,
        exporter: false,
    },
    parameters: {
        docs: {
            canvas: {},
        },
    },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        const DetailsView = () => {
            let { selectedIds, refetch } = useListContext();
            let { data } = useGetOne('users', { id: selectedIds[0] || -1 });

            let [update] = useUpdate('users');

            if (selectedIds.length === 0)
                return <></>;

            const saveAndRefetch = async (fieldValues: FieldValues) => {
                await update('users', { id: data.id, data: fieldValues });
                await refetch();
            };

            return <div style={{ padding: "0px 20px 0px 20px", width: "400px" }}>
                <SimpleForm record={data} onSubmit={saveAndRefetch}>
                    <TextInput source="name"/>
                    <DateInput source="birthday"/>
                    <BooleanInput source="active"/>
                    <NumberInput source="day_offs"/>
                    <ReferenceInput source="department_id" reference="departments"/>
                </SimpleForm>
            </div>;
        };

        const listRenderer = (listContext: ListControllerResult) => {
            let onToggleItem = (id: Identifier) => {
                if (listContext.selectedIds.includes(id)) {
                    listContext.onSelect([]);
                } else {
                    listContext.onSelect([id]);
                }
            };

            return (
                <Datagrid
                    selectedIds={listContext.selectedIds}
                    onToggleItem={onToggleItem}>
                    <TextField source="id"/>
                    <TextField source="name"/>
                </Datagrid>
            );
        };

        return (
            <List aside={<DetailsView/>} {...props}>
                <WithListContext render={listRenderer}/>
            </List>
        );
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    const ResourceContext = ({ children }: { children: React.JSX.Element }) => {
        let definitionContext = useResourceDefinitionContext();
        definitionContext.register({
            name: "departments",
            recordRepresentation: "name",
        });

        return children;
    };

    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContext>
                <Resource name="users" list={Story}/>
            </ResourceContext>
        </AdminContext>
    );
};