import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, BooleanField, defaultI18nProvider, Labeled, RecordContextProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import React from "react";
import { attributeName } from "../../../../ideExtension";

const meta = {
    title: "Blocks/Fields/BooleanField",
    component: BooleanField,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof BooleanField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <BooleanField source={attributeName("active")} {...props} />;
    }
};

export const Custom: Story = {
    render: ({ valueLabelTrue, valueLabelFalse, ...props }) => {
        return (
            <BooleanField
                source={attributeName("active")}
                valueLabelTrue={valueLabelTrue}
                valueLabelFalse={valueLabelFalse}
                title={"Active"}
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
            <RecordContextProvider value={users[0]}>
                <Labeled>{Story()}</Labeled>
            </RecordContextProvider>
        </AdminContext>
    );
};
