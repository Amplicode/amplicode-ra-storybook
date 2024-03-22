import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, email, ResourceContextProvider, SimpleForm, TextInput, useUnique } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";
import { Typography } from "@mui/material";

const meta = {
    title: "Blocks/Inputs/EmailInput",
    component: TextInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <TextInput source={attributeName("email")} validate={email()} {...props} />;
    }
};

export const UniqueValidation: Story = {
    render: (props) => {
        const unique = useUnique();

        return <TextInput source={attributeName("email")} validate={[email(), unique()]} {...props} />;
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body1">Reserved emails</Typography>
                    {users.map(user => {
                        return (
                            <Typography variant="body2">{user.email}</Typography>
                        )
                    })}
                    <Story />
                </div>
            )
        }
    ]
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContextProvider value="users">
                <SimpleForm mode="onChange" toolbar={false}>
                    <Story />
                </SimpleForm>
            </ResourceContextProvider>
        </AdminContext>
    );
};
