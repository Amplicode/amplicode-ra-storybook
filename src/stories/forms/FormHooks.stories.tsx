import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, Button, defaultI18nProvider, NumberInput, SimpleForm, TextInput, } from "react-admin";
import React, { useCallback } from "react";
import { dataProvider } from "../../dataProvider";
import { useFormContext } from "react-hook-form";
import { GenerationInstructions } from "@amplicode/storybook-extensions";

const meta = {
    title: "Forms/Hooks",
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResetForm: Story = {
    render: () => {
        let { reset } = useFormContext();
        const resetForm = useCallback(() => {
            reset();
        }, [reset]);

        return <Button onClick={resetForm} label="Reset form"/>;
    },
    decorators: [
        (Story) => {
            return <SimpleForm toolbar={<></>}>
                <TextInput source="name"/>
                <NumberInput source="age"/>
                <Story/>
            </SimpleForm>;
        }
    ]
}

export const ResetField: Story = {
    render: () => {
        let { resetField, watch } = useFormContext();
        const fieldValue = watch("name", null);

        const resetForm = useCallback(() => {
            resetField("name");
        }, [fieldValue, resetField]);

        return <Button onClick={resetForm} label="Reset name"/>;
    },
    decorators: [
        (Story) => {
            return <SimpleForm toolbar={<></>}>
                <TextInput source="name"/>
                <NumberInput source="age"/>
                <Story/>
            </SimpleForm>;
        }
    ],
}

export const WatchField: Story = {
    render: () => {
        let { watch } = useFormContext();
        const fieldValue = watch("name", null);

        return <GenerationInstructions.Exclude>
            Field value: {fieldValue}
        </GenerationInstructions.Exclude>;
    },
    decorators: [
        (Story) => {
            return <SimpleForm toolbar={<></>}>
                <TextInput source="name"/>
                <Story/>
            </SimpleForm>;
        }
    ],
}

const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <Story/>
    </AdminContext>
);
