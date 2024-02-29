import React from "react";
import {
    DataProvider,
    DataProviderContext,
    defaultI18nProvider,
    I18nContextProvider,
    ResourceDefinition,
    ResourceDefinitionContextProvider,
    StoreContextProvider,
    ThemeProvider,
    useResourceDefinitionContext
} from "react-admin";
import { I18nProvider } from "ra-core/src/types";
import { memoryStore } from "ra-core/src/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { dataProvider as defaultDataProvider } from "./dataProvider";

/**
 * Helper component to register react-admin resources. Only for use in stories.
 * In real application the resources must be registered via <Resource name="resourceName"> inside <Admin></Admin> tag.
 */
export const ResourceContextHelper = ({ children, resources }: {
    children: React.JSX.Element,
    resources: ResourceDefinition[] | ResourceDefinition
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


type AdminStoryContextProps = {
    children: React.JSX.Element | React.JSX.Element[];
    dataProvider?: DataProvider;
    i18nProvider?: I18nProvider;
    resources?: ResourceDefinition[] | ResourceDefinition;
};

export const AdminStoryContext = (
    {
        children,
        dataProvider = defaultDataProvider,
        i18nProvider = defaultI18nProvider,
        resources = []
    }: AdminStoryContextProps
) => {
    return <ThemeProvider>
        <StoreContextProvider value={memoryStore()}>
            <DataProviderContext.Provider value={dataProvider}>
                <I18nContextProvider value={i18nProvider}>
                    <QueryClientProvider client={new QueryClient()}>
                        <ResourceDefinitionContextProvider>
                            <ResourceContextHelper resources={resources}>
                                <>
                                    {children}
                                </>
                            </ResourceContextHelper>
                        </ResourceDefinitionContextProvider>
                    </QueryClientProvider>
                </I18nContextProvider>
            </DataProviderContext.Provider>
        </StoreContextProvider>
    </ThemeProvider>;
};