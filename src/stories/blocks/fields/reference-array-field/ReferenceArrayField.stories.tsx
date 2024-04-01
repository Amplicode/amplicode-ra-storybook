import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    ChipField,
    defaultI18nProvider, RecordContextProvider,
    ReferenceArrayField,
    ResourceContextProvider,
    SingleFieldList,
    TextField
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";

const meta = {
    title: "Fields/ReferenceArrayField",
    component: ReferenceArrayField as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof ReferenceArrayField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ ...props }) => {
        return <ReferenceArrayField source={
            attributeName("role_ids", {
                resourceSelectTitle: "Parent Resource Name",
                attributeSelectTitle: "Reference Attribute Name"
            })
        } reference={
            resourceName("roles", {
                title: "Child Resource Name",
                allowContext: false,
            })
        } {...props} />;
    }
};

export const ManualChips: Story = {
    render: ({ ...props }) => {
        return <ReferenceArrayField source={
            attributeName("role_ids", {
                resourceSelectTitle: "Parent Resource Name",
                attributeSelectTitle: "Reference Attribute Name"
            })
        } reference={
            resourceName("roles", {
                title: "Child Resource Name",
                allowContext: false,
                resourceId: "referenced_resource"
            })
        } {...props}>
            <SingleFieldList>
                <ChipField source={
                    attributeName("name", {
                        attributeSelectTitle: "Child Resource Representation Attribute",
                        resourceId: "referenced_resource"
                    })
                }/>
            </SingleFieldList>
        </ReferenceArrayField>;
    }
};

export const ManualTextField: Story = {
    render: ({ ...props }) => {
        return <ReferenceArrayField source={
            attributeName("role_ids", {
                resourceSelectTitle: "Parent Resource Name",
                attributeSelectTitle: "Reference Attribute Name"
            })
        } reference={
            resourceName("roles", {
                title: "Child Resource Name",
                allowContext: false,
                resourceId: "referenced_resource"
            })
        } {...props}>
            <SingleFieldList>
                <TextField source={
                    attributeName("name", {
                        attributeSelectTitle: "Child Resource Representation Attribute",
                        resourceId: "referenced_resource"
                    })
                }/>
            </SingleFieldList>
        </ReferenceArrayField>;
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <RecordContextProvider value={users[0]}>
                <ResourceContextHelper resources={{
                    name: "roles",
                    recordRepresentation: "name"
                }}>
                    <>
                        User roles:
                        {Story()}
                    </>
                </ResourceContextHelper>
            </RecordContextProvider>
        </AdminContext>
    );
};
