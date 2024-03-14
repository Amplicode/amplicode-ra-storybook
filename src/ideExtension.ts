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
        allowContext: true
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
        allowResourceContext: true
    },
) {
    return storyAttribute;
}

/**
 * Additional info for integration stories with RA Page Wizard
 */

export type WizardInfo<T> = {
    wizardName: string;
    info: T;
}

export type CreatePageWizardInfo = {
    pageType: string;
    readonlyPageType?: boolean;
}