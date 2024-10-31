import { Layout } from "react-admin";
import { MainMenu } from "./MainMenu";

export const CustomLayout = (props: any) => {
  return <Layout {...props} menu={MainMenu} />;
};
