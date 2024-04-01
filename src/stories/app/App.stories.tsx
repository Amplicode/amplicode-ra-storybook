import type { Meta, StoryObj } from "@storybook/react";
import {
    Admin,
    Create,
    EditGuesser,
    Layout,
    LayoutProps,
    ListGuesser,
    Menu,
    Resource,
    ShowGuesser,
} from "react-admin";
import React from "react";
import { dataProvider } from "../../dataProvider";
import fakeDataProvider from "ra-data-fakerest";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";
import { AnyPropsComponent } from "../../utils";

const meta = {
    title: "Admin Application",
    component: AnyPropsComponent,
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Demo Application",
    render: ({...props}) => {
        const MainMenu = () => {
            return <Menu>
                <Menu.ResourceItems/>
            </Menu>;
        };

        const AppLayout = (props: LayoutProps) => <Layout {...props} menu={MainMenu}/>;

        return (
            <Admin dataProvider={
                replaceOnGenerate(
                    dataProvider,
                    fakeDataProvider({})
                )
            }
                   layout={AppLayout}>
                <Resource
                    name="users"
                    edit={EditGuesser}
                    show={ShowGuesser}
                    list={ListGuesser}
                    recordRepresentation={"name"}
                />
                <Resource
                    name="departments"
                    edit={EditGuesser}
                    show={ShowGuesser}
                    list={ListGuesser}
                    recordRepresentation={"name"}
                />
                <Resource
                    name="roles"
                    edit={EditGuesser}
                    show={ShowGuesser}
                    list={ListGuesser}
                    recordRepresentation={"name"}
                />
            </Admin>
        );
    },
};