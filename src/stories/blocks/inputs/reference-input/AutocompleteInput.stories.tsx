import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, AutocompleteInput, Create, defaultI18nProvider, ReferenceInput, ReferenceInputProps, ResourceContextProvider, SimpleForm, useCreateContext, useEditContext } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import { attributeName, resourceName } from "../../../../ideExtension";
import { ResourceContextHelper } from "../../../../utils";
import { GenerationInstructions } from "@amplicode/storybook-extensions";

const meta = {
    title: "Blocks/Inputs/AutocompleteReferenceInput",
    component: ReferenceInput as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof ReferenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultDecorator = (Story: () => React.JSX.Element) => (
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
                <ResourceContextProvider value="users">
                    <Story/>
                </ResourceContextProvider>
        </ResourceContextHelper>
    </AdminContext>
);

export const Readonly: Story = {
    
    render: ({subresourceName, subresourceBackReference}) => {
        const ReadonlyReferenceInput = () => {
            const {record} = useCreateContext();
            const readOnly = record!=null && subresourceBackReference in record && record[subresourceBackReference]!=null;
            console.log(record)
    
            return (
            <ReferenceInput source={subresourceBackReference} reference={subresourceName}>
                <AutocompleteInput readOnly={readOnly}/>
            </ReferenceInput>
            )
        };

        return <Create record={users[0]}>
            <SimpleForm>
                <GenerationInstructions.InsertOnly>
                    <ReadonlyReferenceInput/>
                </GenerationInstructions.InsertOnly>
            </SimpleForm>
        </Create>
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
