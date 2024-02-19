import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    defaultI18nProvider,
    Labeled,
    RecordContextProvider,
    ReferenceField,
    TextField
} from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { ResourceContextHelper } from "../../../../utils";

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
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <ResourceContextHelper resources={{
                name: "departments",
                recordRepresentation: "name",
            }}>
                <Labeled>
                    <Story/>
                </Labeled>
            </ResourceContextHelper>
        </AdminContext>
    );
};
