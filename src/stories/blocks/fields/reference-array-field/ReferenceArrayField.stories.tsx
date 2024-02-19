import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext, ChipField,
    defaultI18nProvider,
    Labeled,
    RecordContextProvider,
    ReferenceArrayField, SingleFieldList,
    TextField,
    useResourceDefinitionContext
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";

const meta = {
    title: "Blocks/Fields/ReferenceArrayField",
    component: ReferenceArrayField as any,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        record: users[0],
    },
} satisfies Meta<typeof ReferenceArrayField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return <>
            User roles:
            <ReferenceArrayField reference="roles" source="role_ids" {...props} />
        </>;
    }
};

export const ManualChips: Story = {
    render: (props) => {
        return <>
            User roles:
            <ReferenceArrayField reference="roles" source="role_ids" {...props}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </>;
    }
};

export const ManualTextField: Story = {
    render: (props) => {
        return <>
            User roles:
            <ReferenceArrayField reference="roles" source="role_ids" {...props}>
                <SingleFieldList>
                    <TextField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </>;
    }
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    const ResourceContext = ({ children }: { children: React.JSX.Element }) => {
        let definitionContext = useResourceDefinitionContext();
        definitionContext.register({
            name: "roles",
            recordRepresentation: "name",
        });

        return children;
    };

    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContext>
                <Labeled>
                    <Story/>
                </Labeled>
            </ResourceContext>
        </AdminContext>
    );
};
