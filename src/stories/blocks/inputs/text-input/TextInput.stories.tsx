import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, Labeled, SimpleForm, TextInput } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";

const meta = {
    title: "Blocks/Inputs/TextInput",
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
        return <TextInput source={attributeName("name")} {...props} />;
    }
};

export const CustomLabel: Story = {
    render: ({ ...props }) => {
        return (
            <TextInput
                source={attributeName("name")}
                {...props}
            />
        );
    },
    args: {
        label: "Custom label",
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <SimpleForm record={users[0]} toolbar={false}>
                {Story()}
            </SimpleForm>
        </AdminContext>
    );
};
