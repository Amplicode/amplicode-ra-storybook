import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, BooleanField, defaultI18nProvider, Labeled } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import React from "react";
import { Controls } from "@storybook/blocks";

const meta = {
    title: "Blocks/Fields/BooleanField",
    component: BooleanField as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        record: users[0],
    },
} satisfies Meta<typeof BooleanField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <BooleanField source="active" {...props} />;
    }
};

export const Custom: Story = {
    render: ({ valueLabelTrue, valueLabelFalse, ...props }) => {
        return (
            <BooleanField
                source="active"
                valueLabelTrue={valueLabelTrue}
                valueLabelFalse={valueLabelFalse}
                TrueIcon={AlarmOnIcon}
                FalseIcon={AlarmOffIcon}
                {...props}
            />
        );
    },
    args: {
        label: 'Active',
        valueLabelTrue: "User is active",
        valueLabelFalse: "User is banned",
        TrueIcon: AlarmOnIcon,
        FalseIcon: AlarmOffIcon,
    },
    argTypes: {
        TrueIcon: {
            options: ['AlarmOnIcon', 'AlarmOffIcon'],
            mapping: {
                'AlarmOnIcon': AlarmOnIcon,
                'AlarmOffIcon': AlarmOffIcon,
            }
        },
        FalseIcon: {
            options: ['AlarmOnIcon', 'AlarmOffIcon'],
            mapping: {
                'AlarmOnIcon': AlarmOnIcon,
                'AlarmOffIcon': AlarmOffIcon,
            }
        }
    }
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <Labeled>
                <Story/>
            </Labeled>
        </AdminContext>
    );
};
