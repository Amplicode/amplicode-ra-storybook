import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, required, SelectInput, SimpleForm } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { parameters } from "../../../../../../amplicode-storybook";
import sampleParam = parameters.sampleParam;

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
        let choices = sampleParam([
            { id: 'Moscow', name: 'Moscow' },
            { id: 'Samara', name: 'Samara' },
            { id: 'Tokyo', name: 'Tokyo' },
        ], []);

        return <SelectInput
            source="city"
            choices={choices}
            {...props}
        />;
    }
};

export const Custom: Story = {
    render: ({ valueLabelTrue, valueLabelFalse, ...props }) => {
        return (
            <SelectInput
                choices={[{ id: 'ben', name: 'Ben' }, { id: 'ben', name: 'Bill' }]}
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
                <Story/>
            </SimpleForm>
        </AdminContext>
    );
};
