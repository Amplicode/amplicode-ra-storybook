import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    AutocompleteInput,
    defaultI18nProvider,
    RecordContextProvider,
    ReferenceInput,
    SimpleForm,
    useRecordContext
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";

const meta = {
    title: "Blocks/Inputs/ReferenceInput",
    component: ReferenceInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof ReferenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return (
            <ReferenceInput
                source={attributeName(
                    "department_id",
                    {
                        resourceSelectTitle: "Source Resource Name",
                        attributeSelectTitle: "Reference Id Attribute",
                    }
                )}
                reference={resourceName(
                    "departments",
                    {
                        title: "Referenced Resource",
                        allowContext: false,
                    }
                )}
                {...props} />
        );
    }
};

export const Readonly: Story = {
    render: (props) => {
        return (
            <ReferenceInput
                source={attributeName(
                    "department_id",
                    {
                        resourceSelectTitle: "Source Resource Name",
                        attributeSelectTitle: "Reference Id Attribute",
                    }
                )}
                reference={resourceName(
                    "departments",
                    {
                        title: "Referenced Resource",
                        allowContext: false,
                    }
                )}
                {...props} >
                <AutocompleteInput readOnly/>
            </ReferenceInput>
        );
    }
};

export const ReadonlyForPredefinedValue: Story = {
    name: 'Readonly for predefined attribute',
    render: ({ subresourceName, subresourceBackReference }) => {
        const ReadonlyReferenceInput = () => {
            const record = useRecordContext();
            const readOnly = record != null && subresourceBackReference in record && record[subresourceBackReference] != null;

            return (
                <ReferenceInput source={subresourceBackReference} reference={subresourceName}>
                    <AutocompleteInput readOnly={readOnly}/>
                </ReferenceInput>
            )
        };

        return <ReadonlyReferenceInput/>
    },

    args: {
        subresourceName: resourceName("departments", {
            title: 'Child Resource',
            resourceId: 'subresource',
            allowContext: false
        }),
        subresourceBackReference: attributeName("department_id",
            {
                resourceId: 'resource',
                attributeSelectTitle: 'Child Resource Reference Attribute'
            }
        )
    }
}


const defaultDecorator = (Story: () => JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContextHelper resources={[
                {
                    name: 'departments',
                    recordRepresentation: 'name',
                },
                {
                    name: 'users',
                    recordRepresentation: 'name',
                },
            ]}>
                <SimpleForm toolbar={false}>
                    <RecordContextProvider value={users[0]}>
                        <Story/>
                    </RecordContextProvider>
                </SimpleForm>
            </ResourceContextHelper>
        </AdminContext>
    );
};
