import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext, Button,
    defaultI18nProvider, TextField, useGetMany,
    useGetOne,
} from "react-admin";
import { delayDataProvider } from "../../../dataProvider";
import React from "react";
// import { resourceName } from "@/ideExtension";
import { GenerationInstructions, parameters } from "amplicode-storybook";
import sampleParam = parameters.sampleParam;

const meta = {
    title: "Blocks/DataProvider/UseGetMany",
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        let { data, isLoading, refetch } = useGetMany(
            'users',
            { ids: sampleParam([1, 2, 3], []) },
        );

        return <GenerationInstructions.Exclude>
            {isLoading && <div>Loading</div>}
            {!isLoading && (data || []).map(value => {
                return (<><TextField record={value} source="name"/>
                    <p/></>);
            })}
            {!isLoading && <Button label="Reload" onClick={() => refetch()}/>}
        </GenerationInstructions.Exclude>;
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext
            dataProvider={delayDataProvider}
            i18nProvider={defaultI18nProvider}
        >
            <Story/>
        </AdminContext>
    );
};