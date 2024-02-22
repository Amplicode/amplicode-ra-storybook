import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, ReferenceInput, SimpleForm } from "react-admin";
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
                <SimpleForm record={users[0]} toolbar={false}>
                    {Story()}
                </SimpleForm>
            </ResourceContextHelper>
        </AdminContext>
    );
};
