import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, AppBar, defaultI18nProvider, Labeled, Layout, Title } from "react-admin";
import React from "react";

const meta = {
    title: "Misc/Title",
    component: Title,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
    excludeStories: /.*/,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({...props}) => {
        return <>
            <Title title="Insert anywhere, this will appear at app Toolbar"/>
        </>;
    }
};


const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext i18nProvider={defaultI18nProvider}>
            {/*<AppBar>*/}
            {/*    <Labeled>{Story()}</Labeled>*/}
            {/*</AppBar>*/}
            <Layout menu={props => <></>} dashboard={() => <Story/>}>
                <Story/>
            </Layout>
        </AdminContext>
    );
};
