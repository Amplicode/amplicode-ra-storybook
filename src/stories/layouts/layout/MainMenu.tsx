import { Menu } from "react-admin";
import { HorizontalMenu } from "./container-layout/HorizontalMenu";

// export const MainMenu = () => {
//   return (
//     <Menu>
//       <Menu.ResourceItems />
//       <Menu.Item
//         to="/comments"
//         primaryText="Comments"
//       />
//       <Menu.Item to="/users" primaryText="Users" />
//     </Menu>
//   );
// };

export const MainMenu = () => {
  return (
    <HorizontalMenu>
      {/* <HorizontalMenu.ResourceItems /> */}
      <HorizontalMenu.Item to="/home" primaryText="Home" />
      <HorizontalMenu.Item to="/blank1" primaryText="Blank1" />
      <HorizontalMenu.Item to="/projects" primaryText="Projects" />
      <HorizontalMenu.Item
        to="/about"
        primaryText="About" />
    </HorizontalMenu>
  );
};
