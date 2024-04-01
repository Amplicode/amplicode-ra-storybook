import type { Meta, StoryObj } from "@storybook/react";
import { Button, Notification, SaveButton, SimpleForm, TextInput, Toolbar, useNotify, } from "react-admin";
import React, { ComponentType, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { AdminStoryContext } from "../../../utils";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Pages/CustomForm",
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<ComponentType<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({...props}) => {
        const notify = useNotify();

        const FormToolbar = () => {
            const { reset } = useFormContext();

            const resetForm = useCallback(() => {
                reset();
            }, [reset]);

            return (
                <Toolbar>
                    <SaveButton label="Submit"/>
                    <Button
                        label="Reset"
                        size="medium"
                        variant="outlined"
                        onClick={resetForm}
                        sx={{ marginLeft: "1em" }}
                    />
                </Toolbar>
            );
        };

        function onSubmit(values: Record<string, any>) {
            notify(values.firstName + ' ' + values.lastName, { type: "success" });
        }

        return (
            <SimpleForm
                record={{ firstName: 'John', lastName: 'Doe' }}
                toolbar={<FormToolbar/>}
                onSubmit={onSubmit}
            >
                <TextInput source="firstName"/>
                <TextInput source="lastName"/>
            </SimpleForm>
        );
    },
};


const defaultDecorator = (Story: () => React.JSX.Element) => (

    <MemoryRouter initialEntries={['/']}>
        <AdminStoryContext>
            <Story/>

            <Notification/>
        </AdminStoryContext>
    </MemoryRouter>
);
