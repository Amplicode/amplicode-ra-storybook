import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, Button, defaultI18nProvider, useGetOne, useUpdate, } from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { resourceName } from "../../../ideExtension";

const meta = {
    title: "Blocks/DataProvider/UseUpdate",
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        let { data } = useGetOne(
            resourceName('users', { allowContext: false }),
            { id: 1 },
        );

        let [
            update,
        ] = useUpdate('users', { id: data?.id, data: { name: 'New name' } });

        return <GenerationInstructions.Exclude>
            <Button label="Update" onClick={() => update()}/>
            <p/>
            <>Data: {data?.name}</>
        </GenerationInstructions.Exclude>;
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext
            dataProvider={dataProvider}
            i18nProvider={defaultI18nProvider}
        >
            <Story/>
        </AdminContext>
    );
};
