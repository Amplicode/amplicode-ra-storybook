import { styled, AppBar as MuiAppBar } from "@mui/material";

const PREFIX = "RaAppBar";
export const AppBarClasses = {
  appBar: `${PREFIX}-appBar`,
  toolbar: `${PREFIX}-toolbar`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
  title: `${PREFIX}-title`,
};

export const StyledAppBar = styled(MuiAppBar, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${AppBarClasses.toolbar}`]: {
    padding: `0 ${theme.spacing(1)}`,
    [theme.breakpoints.down("md")]: {
      minHeight: theme.spacing(6),
    },
  },
  [`& .${AppBarClasses.menuButton}`]: {
    marginRight: "0.2em",
  },
  [`& .${AppBarClasses.title}`]: {},
}));
