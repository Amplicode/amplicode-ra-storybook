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
import React, { useEffect } from "react";
import { dataProvider } from "../../dataProvider";
import { FieldValues, useFormContext } from "react-hook-form";
import { ResourceContextHelper } from "../../utils";
import { replaceOnGenerate, GenerationInstructions } from "@amplicode/storybook-extensions";

const meta = {
    title: "Forms",
    component: Create as any,
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof Create>;

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

export const DependentFields: Story = {
    render: () => {

        const DependentInput = () => {
            const { watch, resetField } = useFormContext();
            const parentId = watch(replaceOnGenerate('user_id', 'parentId'), null);

            const filter = parentId ? replaceOnGenerate({ 'user_id': parentId }, { 'parent_id': parentId }) : {};

            useEffect(() => {
                resetField(replaceOnGenerate('task_id', 'childId'));
            }, [parentId, resetField]);

            return <ReferenceInput source={replaceOnGenerate('task_id', 'childId')} reference="tasks" filter={filter}/>;
        };

        return (
            <GenerationInstructions.Exclude>
                <SimpleForm onSubmit={data => {
                    alert('Task id: ' + data.task_id)
                }}>
                    <ReferenceInput source="user_id" reference="users"/>
                    <DependentInput/>
                </SimpleForm>
            </GenerationInstructions.Exclude>
        );
    }
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
