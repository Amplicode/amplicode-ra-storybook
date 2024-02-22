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
import { replaceOnGenerate } from "../../../../amplicode-storybook";

const meta = {
    title: "Admin Application",
    component: Create as any,
} satisfies Meta<typeof Create>;

export default meta;
type Story = StoryObj<typeof meta>;

export type WizardInfo = {
    wizardName: string;
    wizardParams: any;
}

export type CreateAppWizardParams = {

};

export const Default: Story & WizardInfo = {
    render: (props) => {
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
    wizardName: "amplicode.createAdminApp",
    wizardParams: {

    } satisfies CreateAppWizardParams
};