import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, BooleanInput, defaultI18nProvider, Labeled, SimpleForm } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";

const meta = {
    title: "Blocks/Inputs/BooleanInput",
    component: BooleanInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof BooleanInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <BooleanInput source="active" {...props} />;
    }
};

export const CustomLabel: Story = {
    render: ({ label, ...props }) => {
        return (
            <BooleanInput
                source="active"
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
