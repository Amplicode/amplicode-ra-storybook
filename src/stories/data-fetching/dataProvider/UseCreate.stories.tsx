import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, Button, defaultI18nProvider, useCreate, } from "react-admin";
import { delayDataProvider } from "../../../dataProvider";
import React from "react";
import { GenerationInstructions, parameters } from "amplicode-storybook";
import { resourceName } from "../../../ideExtension";
import Exclude = GenerationInstructions.Exclude;

const meta = {
    title: "Blocks/DataProvider/UseCreate",
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        let [
            create,
            { data, isLoading },
        ] = useCreate(
            resourceName('users'),
            {
                data: parameters.sampleParam({ name: 'New user' }, {})
            }
        );

        return <Exclude>
            <Button label="Create" onClick={() => create()}/>
            <p/>
            {isLoading && 'Loading'}
            {data && <>Created: {data.name}</>}
        </Exclude>;
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
