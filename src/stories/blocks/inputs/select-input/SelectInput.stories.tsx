import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, SelectInput, SimpleForm } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
    title: "Blocks/Inputs/SelectInput",
    component: SelectInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        const choices: { id: string, name: string }[] = replaceOnGenerate([
            { id: 'Moscow', name: 'Moscow' },
            { id: 'Samara', name: 'Samara' },
            { id: 'Tokyo', name: 'Tokyo' },
        ], [/*<ampl:cursor>*/]);

        return <SelectInput
            source="city"
            choices={choices}
            {...props}
        />;
    }
};

export const Custom: Story = {
    render: ({ ...props }) => {
        const choices: { id: number, name: string }[] = replaceOnGenerate([
            { id: 1, name: 'Bill' },
            { id: 2, name: 'Jack' },
        ], [/*<ampl:cursor>*/]);

        return (
            <SelectInput
                choices={choices}
                source="name"
                {...props}
            />
        );
    },
    args: {
        label: "User name",
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
