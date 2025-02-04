import React from "react";
import {
  AdminRouter,
  DataProvider,
  DataProviderContext,
  defaultI18nProvider,
  defaultLightTheme,
  I18nContextProvider,
  NotificationContextProvider,
  ResourceDefinition,
  ResourceDefinitionContextProvider,
  StoreContextProvider,
  ThemeProvider,
  ThemesContext,
  useResourceDefinitionContext,
} from "react-admin";
import { I18nProvider } from "ra-core/src/types";
import { memoryStore } from "ra-core/src/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dataProvider as defaultDataProvider } from "./dataProvider";
import { styled } from "@mui/material";

/**
 * Helper component to register react-admin resources. Only for use in stories.
 * In real application the resources must be registered via <Resource name="resourceName"> inside <Admin></Admin> tag.
 */
export const ResourceContextHelper = ({
  children,
  resources,
}: {
  children: React.JSX.Element;
  resources: ResourceDefinition[] | ResourceDefinition;
}) => {
  let definitionContext = useResourceDefinitionContext();
  if (Array.isArray(resources)) {
    for (const resource of resources) {
      definitionContext.register(resource);
    }
  } else {
    definitionContext.register(resources);
  }

  return children;
};

export const AnyPropsComponent = (props: { [name: string]: any }) => <></>;

type AdminStoryContextProps = {
  children: React.JSX.Element | React.JSX.Element[];
  dataProvider?: DataProvider;
  i18nProvider?: I18nProvider;
  resources?: ResourceDefinition[] | ResourceDefinition;
};

export const AdminStoryContext = ({
  children,
  dataProvider = defaultDataProvider,
  i18nProvider = defaultI18nProvider,
  resources = [],
}: AdminStoryContextProps) => {
  return (
    <StoreContextProvider value={memoryStore()}>
      <DataProviderContext.Provider value={dataProvider}>
        <I18nContextProvider value={i18nProvider}>
          <NotificationContextProvider>
            <QueryClientProvider client={new QueryClient()}>
              <ResourceDefinitionContextProvider>
                <ResourceContextHelper resources={resources}>
                  <ThemesContext.Provider
                    value={{ lightTheme: defaultLightTheme }}
                  >
                    <ThemeProvider>{children}</ThemeProvider>
                  </ThemesContext.Provider>
                </ResourceContextHelper>
              </ResourceDefinitionContextProvider>
            </QueryClientProvider>
          </NotificationContextProvider>
        </I18nContextProvider>
      </DataProviderContext.Provider>
    </StoreContextProvider>
  );
};

export const Code = styled("code")({
  background: "rgb(235, 245, 255)",
  padding: "2px 4px",
});
