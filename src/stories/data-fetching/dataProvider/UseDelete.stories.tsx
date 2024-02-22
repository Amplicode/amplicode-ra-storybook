import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, Button, defaultI18nProvider, useDelete, useGetOne, } from "react-admin";
import { delayDataProvider } from "../../../dataProvider";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { resourceName } from "../../../ideExtension";

const meta = {
    title: "Blocks/DataProvider/UseDelete",
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        let { data, refetch, isError, isLoadingError, isLoading } = useGetOne(
            resourceName('users', { allowContext: false }),
            { id: 1 },
            { cacheTime: -1 }
        );

        let [
            deleteOne,
        ] = useDelete('users', { id: data?.id }, {
            mutationMode: 'undoable'
        });

        return <GenerationInstructions.Exclude>
            <Button label="Delete" onClick={async () => {
                data = undefined;
                await deleteOne();
                await refetch();
                await refetch();
            }}/>
            <p/>
            {data?.id ? <>Data: {data?.name}</> : 'Deleted'}
            {isError && 'isError'}
            {isLoadingError && 'isLoadingError'}
            {isLoading && 'isLoading'}
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
