import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    Create,
    defaultI18nProvider,
    ReferenceInput,
    required,
    SimpleForm,
    TextInput,
} from "react-admin";
import React, { ComponentType, useEffect } from "react";
import { dataProvider } from "../../dataProvider";
import { FieldValues, useFormContext } from "react-hook-form";
import { ResourceContextHelper } from "../../utils";
import { replaceOnGenerate, topLevel } from "@amplicode/storybook-extensions";

const meta = {
    title: "Forms/Receipts",
    component: Create as any,
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<ComponentType<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        let onSubmit = (data: FieldValues) => {
            alert(data.firstName + ' ' + data.lastName)
        };

        return (
            <SimpleForm onSubmit={onSubmit}>
                <TextInput source="firstName"
                           validate={required('Enter first name')}
                           helperText={"First Name"}
                           placeholder={"fst name"}/>
                <TextInput source="lastName"/>
            </SimpleForm>
        );
    },
};

export const InputsChain: Story = {
    render: ({ parentId, attributeId }) => {

        const DependentInput = topLevel(() => {
            const { watch, resetField } = useFormContext();
            const parentIdValue = watch(parentId, null);

            const filter = parentIdValue ? replaceOnGenerate({ 'user_id': parentIdValue }, { 'parent_id': parentIdValue }) : {};

            useEffect(() => {
                resetField(attributeId);
            }, [parentIdValue, resetField]);

            return <ReferenceInput source={attributeId} reference="tasks" filter={filter}/>;
        });

        return (
            <DependentInput/>
        );
    },
    args: {
        parentId: replaceOnGenerate('user_id', 'parentId'),
        attributeId: replaceOnGenerate('task_id', 'childId'),
    },
    decorators: [
        (Story) => {
            return <SimpleForm onSubmit={data => {
                alert('Task id: ' + data.task_id)
            }}>
                <ReferenceInput source="user_id" reference="users"/>
                <Story/>
            </SimpleForm>;
        }
    ]
}

const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextHelper resources={[
            {
                name: "users",
                recordRepresentation: "name"
            },
            {
                name: "tasks",
                recordRepresentation: "name"
            }
        ]}>
            <Story/>
        </ResourceContextHelper>
    </AdminContext>
);
