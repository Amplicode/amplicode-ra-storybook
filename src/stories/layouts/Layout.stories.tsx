import type { Meta, StoryObj } from "@storybook/react";
import {
  Admin,
  CustomRoutes,
  EditGuesser,
  Layout,
  LayoutProps,
  ListGuesser,
  Menu,
  Resource,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "../../dataProvider";
import fakeDataProvider from "ra-data-fakerest";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";
import { AnyPropsComponent } from "../../utils";
import { LandingLayout } from "./layout/landing-layout/LandingLayout";
import { HorizontalMenu } from "./layout/landing-layout/HorizontalMenu";
import { Route } from "react-router-dom";

const meta = {
  title: "Layouts",
  component: AnyPropsComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Layout",
  render: () => {
    const MainMenu = () => {
      return (
        <Menu>
          <Menu.ResourceItems />
        </Menu>
      );
    };

    const AppLayout = (props: LayoutProps) => (
      <Layout {...props} menu={MainMenu} />
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
      </Admin>
    );
  },
};

export const Landing: Story = {
  name: "Landing Layout",
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
      <LandingLayout {...props} menu={MainMenu} userMenu={true} />
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
