import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, DeleteButton, defaultI18nProvider, RecordContextProvider } from "react-admin";
import React from "react";
import { AnyPropsComponent } from "../../../utils";
import { dataProvider, users } from "../../../dataProvider";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
    title: "Buttons/DeleteButton",
    component: AnyPropsComponent,
    args: {
        label: "Delete"
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({...props}) => {
        return <DeleteButton {...props}/>;
    },
};

export const Outlined: Story = {
    render: ({...props}) => {
        return <DeleteButton {...props}/>;
    },
    args: {
        variant: "outlined"
    }
};

export const Filled: Story = {
    render: ({...props}) => {
        return <DeleteButton {...props} />;
    },
    args: {
        variant: "contained"
    }
};

export const WithState: Story = {
    name: "Delete with predefined record attributes",
    render: ({...props}) => {
        return <DeleteButton {...props} />;
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
