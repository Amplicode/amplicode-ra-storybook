import type { Meta, StoryObj } from "@storybook/react";
import { BooleanInput } from "react-admin";
import { attributeName } from "../../../../ideExtension";
import { inputDecorators } from "../inputDecorators";

const meta = {
    title: "Inputs/BooleanInput",
    component: BooleanInput as any,
    parameters: {
        // layout: "centered",
    },
    decorators: [
        ...inputDecorators
    ],
    args: {
        source: "active"
    }
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
