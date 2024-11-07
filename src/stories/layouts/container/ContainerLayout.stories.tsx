import type { Meta, StoryObj } from "@storybook/react";
import {
  Admin,
  CustomRoutes,
  EditGuesser,
  LayoutProps,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import fakeDataProvider from "ra-data-fakerest";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";
import { AnyPropsComponent } from "../../../utils";
import { ContainerLayout } from "../layout/container-layout/ContainerLayout";
import { HorizontalMenu } from "../layout/container-layout/HorizontalMenu";
import { Route } from "react-router-dom";

const meta = {
  title: "Layouts/Container",
  component: Admin,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Container: Story = {
  name: "Container Layout",
  render: () => {
    const MainMenu = () => {
      return (
        <HorizontalMenu>
          <HorizontalMenu.Item to="/home" primaryText="Home" />
          <HorizontalMenu.Item to="/projects" primaryText="Projects" />
          <HorizontalMenu.Item to="/about" primaryText="About" />
          <HorizontalMenu.ResourceItems />
        </HorizontalMenu>
      );
    };

    const AppLayout = (props: LayoutProps) => (
      <ContainerLayout {...props} menu={MainMenu} userMenu={true} />
    );

    return (
      <Admin
        dataProvider={replaceOnGenerate(dataProvider, fakeDataProvider({}))}
        layout={AppLayout}
      >
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

        <CustomRoutes>
          <Route path="/home" element={<div>Home</div>} />
          <Route path="/projects" element={<div>Projects</div>} />
          <Route path="/about" element={<div>About</div>} />
        </CustomRoutes>
      </Admin>
    );
  },
};
