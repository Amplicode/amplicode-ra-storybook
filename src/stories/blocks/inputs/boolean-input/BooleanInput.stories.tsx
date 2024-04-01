import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, BooleanInput, defaultI18nProvider, Labeled, SimpleForm } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";

const meta = {
    title: "Inputs/BooleanInput",
    component: BooleanInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof BooleanInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({...props}) => {
        return <BooleanInput source={attributeName("active")} {...props} />;
    }
};

export const CustomLabel: Story = {
    render: ({ label, ...props }) => {
        return (
            <BooleanInput
                source={attributeName("active")}
                label={label}
                {...props}
            />
        );
    },
    args: {
        label: "User is active",
    },
};

const defaultDecorator = (Story: () => JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <SimpleForm record={users[0]} toolbar={false}>
                <Labeled>{Story()}</Labeled>
            </SimpleForm>
        </AdminContext>
    );
};
