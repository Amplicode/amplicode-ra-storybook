import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, NumberInput, SimpleForm } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";

const meta = {
    title: "Blocks/Inputs/NumberInput",
    component: NumberInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <NumberInput source={attributeName("day_offs")} {...props} />;
    }
};

export const CustomLabel: Story = {
    render: ({ valueLabelTrue, valueLabelFalse, ...props }) => {
        return (
            <NumberInput
                source={attributeName("day_offs")}
                {...props}
            />
        );
    },
    args: {
        label: "User day offs",
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
