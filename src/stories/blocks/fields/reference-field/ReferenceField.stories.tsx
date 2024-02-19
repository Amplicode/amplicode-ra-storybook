import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    defaultI18nProvider,
    Labeled,
    RecordContextProvider,
    ReferenceField,
    TextField,
    useResourceDefinitionContext
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";

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
    render: (props) => {
        return <>
            User department:
            <ReferenceField reference="departments" source="department_id" {...props} />
        </>;
    }
};

export const DisplayByCustomField: Story = {
    render: (props) => {
        return <>
            User department:
            <ReferenceField reference="departments" source="department_id" {...props}>
                <Labeled>
                    <TextField source="name"/>
                </Labeled>
            </ReferenceField>
        </>;
    }
};
export const WithEmptyText: Story = {
    render: () => {
        return <>
            User department:
            <ReferenceField reference="departments" source="department_id"
                            emptyText="No department"/>
        </>;
    },
    decorators: [
        (Story) => {
            return <RecordContextProvider value={{ id: 1 }}>
                <Story/>
            </RecordContextProvider>;
        }
    ]
}

const defaultDecorator = (Story: () => React.JSX.Element) => {
    const ResourceContext = ({ children }: { children: React.JSX.Element }) => {
        let definitionContext = useResourceDefinitionContext();
        definitionContext.register({
            name: "departments",
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
