import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    ChipField,
    defaultI18nProvider,
    RecordContextProvider,
    ReferenceField,
    TextField
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";

const meta = {
    title: "Blocks/Fields/ReferenceField",
    component: ReferenceField as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        record: users[0],
    },
} satisfies Meta<typeof ReferenceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayByRecordRepresentation: Story = {
    render: ({ attrName, resourceName, ...props }) => {
        return <ReferenceField source={attrName} reference={resourceName} {...props} />;
    },
    args: {
        attrName: attributeName("department_id", {
            resourceSelectTitle: "Parent Resource Name",
            attributeSelectTitle: "Reference Attribute Name"
        }),
        resourceName: resourceName("departments", {
            title: "Child Resource Name",
            allowContext: false
        })
    }
};

export const DisplayWithCustomField: Story = {
    render: ({attrName, resourceName, ...props}) => {
        return <ReferenceField source={attrName} reference={resourceName} {...props}>
            <TextField source="name"/>
        </ReferenceField>;
    },
    args: {
        attrName: attributeName("department_id", {
            resourceSelectTitle: "Parent Resource Name",
            attributeSelectTitle: "Reference Attribute Name"
        }),
        resourceName: resourceName("departments", {
            title: "Child Resource Name",
            allowContext: false
        })
    }
};
export const WithEmptyText: Story = {
    render: ({attrName, resourceName, ...props}) => {
        return <ReferenceField source={attrName} reference={resourceName} {...props}/>;
    },
    args: {
        attrName: attributeName("department_id", {
            resourceSelectTitle: "Parent Resource Name",
            attributeSelectTitle: "Reference Attribute Name"
        }),
        resourceName: resourceName("departments", {
            title: "Child Resource Name",
            allowContext: false
        }),
        emptyText: "No department"
    },
    decorators: [
        (Story) => {
            return <RecordContextProvider value={{ id: 1 }}>
                {Story()}
            </RecordContextProvider>;
        }
    ]
}

export const ChipReference: Story = {
    render: ({ attrName, resourceName, chipLabelAttribute, ...props }) => {
        return <ReferenceField source={attrName} reference={resourceName} {...props}>
            <ChipField source={chipLabelAttribute}/>
        </ReferenceField>;
    },
    args: {
        attrName: attributeName("department_id", {
            resourceSelectTitle: "Parent Resource Name",
            attributeSelectTitle: "Reference Attribute Name"
        }),
        resourceName: resourceName("departments", {
            title: "Referenced Resource Name",
            resourceId: "referenced_resource",
            allowContext: false
        }),
        chipLabelAttribute: attributeName("name", {
            resourceId: "referenced_resource",
            attributeSelectTitle: "Chip Label Attribute Name"
        })
    }
}

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContextHelper resources={{
                name: "departments",
                recordRepresentation: "name",
            }}>
                <>
                    User department:
                    <Story/>
                </>
            </ResourceContextHelper>
        </AdminContext>
    );
};
