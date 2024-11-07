import { createElement, ReactNode } from "react";
import { Button, ButtonGroup, MenuList, useMediaQuery } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

import {
  DashboardMenuItem,
  MenuItemLinkProps,
  MenuItemLink as RaMenuItemLink,
  useBasename,
  useCreatePath,
  useGetResourceLabel,
  useResourceDefinitions,
  useTranslate,
} from "react-admin";
import { useMatch, useNavigate } from "react-router-dom";

const MenuItemLink = (props: MenuItemLinkProps) => {
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const translate = useTranslate();
  const navigate = useNavigate();
  const basename = useBasename();
  const to =
    (typeof props.to === "string" ? props.to : props.to.pathname) || "";
  const match = useMatch({ path: to, end: to === `${basename}/` });
  const text = props.children
    ? props.children
    : typeof props.primaryText === "string"
    ? translate(props.primaryText, { _: props.primaryText })
    : props.primaryText;

  return isXSmall ? (
    <RaMenuItemLink {...props} />
  ) : (
    <Button
      onClick={() => navigate(to)}
      sx={(theme) => ({
        color: match ? theme.palette.primary.main : "inherit",
      })}
    >
      {text}
    </Button>
  );
};

export const ResourceMenuItem = ({ name }: { name: string }) => {
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  if (!resources || !resources[name]) return null;
  return (
    <MenuItemLink
      to={createPath({
        resource: name,
        type: "list",
      })}
      state={{ _scrollToTop: true }}
      primaryText={<>{getResourceLabel(name, 2)}</>}
      leftIcon={resources[name].icon && createElement(resources[name].icon)}
    />
  );
};

export const ResourceMenuItems = () => {
  const resources = useResourceDefinitions();
  return (
    <>
      {Object.keys(resources)
        .filter((name) => resources[name].hasList)
        .map((name) => (
          <ResourceMenuItem key={name} name={name} />
        ))}
    </>
  );
};

export const HorizontalMenu = (props: MenuProps) => {
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const { children, ...rest } = props;

  return isXSmall ? (
    <StyledMenuList {...rest}>
      {children}
    </StyledMenuList>
  ) : (
    <StyledButtonGroup variant="text">{children}</StyledButtonGroup>
  );
};

export interface MenuProps {
  children?: ReactNode;
  className?: string;
  dense?: boolean;
  [key: string]: any;
}

HorizontalMenu.Item = MenuItemLink;
HorizontalMenu.DashboardItem = DashboardMenuItem;
HorizontalMenu.ResourceItem = ResourceMenuItem;
HorizontalMenu.ResourceItems = ResourceMenuItems;

const PREFIX = "RaMenu";

const StyledMenuList = styled(MenuList, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  [theme.breakpoints.only("xs")]: {
    marginTop: 0,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledButtonGroup = styled(ButtonGroup, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    marginTop: 0,
  },
  color: theme.palette.background.default,
  [`
    & .MuiButtonGroup-middleButton,
    & .MuiButtonGroup-firstButton,
    & .MuiButtonGroup-lastButton
  `]:
    {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      border: 0,
      fontWeight: 500,
      textTransform: "uppercase",
    },
}));
