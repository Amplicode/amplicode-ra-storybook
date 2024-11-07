import React, { ComponentType, ErrorInfo, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import clsx from "clsx";
import { styled, SxProps, Theme } from "@mui/material/styles";
import { Toolbar, useMediaQuery, Stack, Box, Container } from "@mui/material";
import { AppBarClasses, StyledAppBar } from "./AppBar";
import {
  Loading,
  MenuProps,
  Sidebar as DefaultSidebar,
  SidebarToggleButton,
  UserMenu,
  Error,
  ErrorProps,
  SidebarProps,
  AppBarProps,
} from "react-admin";
import { HorizontalMenu } from "./HorizontalMenu";

const RaLogo = () => {
  return <img width={32} height={32} src="favicon.ico" alt="RaLogo" />;
};

const ExampleFooter = () => {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.grey[900],
        padding: theme.spacing(1),
        color: theme.palette.secondary.contrastText,
      })}
    >
      <Container>
        <Stack width={"100%"} direction={"row"} alignItems={"center"}>
          Footer content
        </Stack>
      </Container>
    </Box>
  );
};

const DefaultUserMenu = <UserMenu />;

export const ContainerLayout = (props: LayoutProps) => {
  const {
    appBar: AppBar = StyledAppBar,
    children,
    className,
    error: errorComponent,
    menu: Menu = HorizontalMenu,
    logo: Logo = RaLogo,
    sidebar: Sidebar = DefaultSidebar,
    footerContent: Footer = ExampleFooter,
    userMenu = DefaultUserMenu,
    ...rest
  } = props;

  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const [errorInfo, setErrorInfo] = useState<ErrorInfo | undefined>(undefined);

  const handleError = (_error: Error, info: ErrorInfo) => {
    setErrorInfo(info);
  };

  return (
    <Core className={clsx("layout", className)} {...rest}>
      <div className={LayoutClasses.appFrame}>
        <AppBar color="secondary">
          <Toolbar
            disableGutters
            variant={isXSmall ? "regular" : "dense"}
            className={AppBarClasses.toolbar}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Stack
                direction={isXSmall ? "row" : "row-reverse"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flex={1}
                spacing={3}
                sx={(theme) => ({
                  justifyContent: "space-between",
                  [theme.breakpoints.down("sm")]: {
                    justifyContent: "flex-start",
                  },
                })}
              >
                {isXSmall ? (
                  <SidebarToggleButton className={AppBarClasses.menuButton} />
                ) : (
                  <Box display={"flex"} flex={1} justifyContent={"center"}>
                    <Menu />
                  </Box>
                )}
                <Logo />
              </Stack>
              <div>
                {typeof userMenu === "boolean" ? (
                  userMenu === true ? (
                    <UserMenu />
                  ) : null
                ) : (
                  userMenu
                )}
              </div>
            </Stack>
          </Toolbar>
        </AppBar>
        <main className={LayoutClasses.contentWithSidebar}>
          {isXSmall && (
            <Sidebar>
              <Menu />
            </Sidebar>
          )}
          <Box sx={{ width: "100%" }}>
            <ErrorBoundary
              onError={handleError}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <Error
                  error={error}
                  errorComponent={errorComponent}
                  errorInfo={errorInfo}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ErrorBoundary>
          </Box>
        </main>
        {Footer ? <footer className="page-footer">{<Footer />}</footer> : null}
      </div>
    </Core>
  );
};

export interface LayoutProps {
  appBar?: ComponentType<AppBarProps>;
  logo?: ComponentType;
  className?: string;
  children: React.ReactNode;
  userMenu?: JSX.Element | boolean;
  error?: ComponentType<ErrorProps>;
  menu?: ComponentType<MenuProps>;
  sidebar?: ComponentType<SidebarProps>;
  footerContent?: ComponentType | false;
  sx?: SxProps;
}

export interface LayoutState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const PREFIX = "RaLayout";
export const LayoutClasses = {
  appFrame: `${PREFIX}-appFrame`,
  contentWithSidebar: `${PREFIX}-contentWithSidebar`,
  content: `${PREFIX}-content`,
};

const Core = styled("div", {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  width: "100%",
  color: theme.palette.getContrastText(theme.palette.background.default),

  [`& .${LayoutClasses.appFrame}`]: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(7),
    },
  },
  [`& .${LayoutClasses.contentWithSidebar}`]: {
    display: "flex",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [`& .${LayoutClasses.content}`]: {
    backgroundColor: theme.palette.background.default,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexBasis: 0,
    padding: 0,
    [theme.breakpoints.up("xs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
}));
