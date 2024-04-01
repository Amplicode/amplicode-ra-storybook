import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, EditButton, defaultI18nProvider, RecordContextProvider } from "react-admin";
import React from "react";
import { AnyPropsComponent } from "../../../utils";
import { dataProvider, users } from "../../../dataProvider";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
    title: "Buttons/EditButton",
    component: AnyPropsComponent,
    args: {
        label: "Edit"
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({...props}) => {
        return <EditButton {...props}/>;
    },
};

export const Outlined: Story = {
    render: ({...props}) => {
        return <EditButton {...props}/>;
    },
    args: {
        variant: "outlined"
    }
};

export const Filled: Story = {
    render: ({...props}) => {
        return <EditButton {...props} />;
    },
    args: {
        variant: "contained"
    }
};

export const WithState: Story = {
    name: "Edit with predefined record attributes",
    render: ({...props}) => {
        return <EditButton {...props} />;
    },
    args: {
        state: replaceOnGenerate({}, { record: { /*default record*/ } })
    },
    decorators: [(Story) => <Story/>]
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <RecordContextProvider value={users[0]}>
                <Story/>
            </RecordContextProvider>
        </AdminContext>
    );
};
