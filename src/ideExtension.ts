/**
 * Additional info for generator.
 * @param storyResource resource name that is used in the story
 * @param generatorOptions options of generator
 */
export function resourceName(
    storyResource: string,
    generatorOptions: {
        title?: string,
        allowContext?: boolean,
        resourceId?: string,
    } = {
        title: "Resource Name",
        allowContext: true,
        resourceId: 'referenced_resource'
    },
) {
    return storyResource
}

export function attributeName(
    storyAttribute: string,
    generatorOptions: {
        resourceSelectTitle?: string,
        attributeSelectTitle?: string,
        resourceId?: string,
        attributeId?: string,
        allowResourceContext?: boolean
    } = {
        resourceSelectTitle: "Resource Name",
        attributeSelectTitle: "Attribute Name",
        allowResourceContext: true,
        resourceId: 'resource'
    },
) {
    return storyAttribute;
}

/**
 * Additional info for integration stories with RA Page Wizard
 */

export type CreatePageWizardParams = {
    pageType: string;
    readonlyPageType?: boolean;
}