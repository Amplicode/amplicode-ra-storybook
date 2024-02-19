import React from "react";
import { ResourceDefinition, useResourceDefinitionContext } from "react-admin";

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