import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { Meta, StoryObj } from "@storybook/react";
import { AdminContext, Button, DateInput, Edit, Notification, SimpleForm, TextInput, defaultI18nProvider, useNotify } from "react-admin";
import { dataProvider } from "../../dataProvider";

const meta = {
    title: 'Notifications/UseNotify',
    decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    render: () => {
        const notify = useNotify();

        const notifySucces = () => {
            notify('Success', { type: 'success' });
        };

        return <GenerationInstructions.Exclude>
            <Button label="click" onClick={notifySucces} />
        </GenerationInstructions.Exclude>
    }
}

export const Error: Story = {
    render: () => {
        const notify = useNotify();

        const notifyError = () => {
            notify('Error', { type: 'error' });
        };

        return <GenerationInstructions.Exclude>
            <Button label="click" onClick={notifyError} />
        </GenerationInstructions.Exclude>
    }
}

export const Info: Story = {
    render: () => {
        const notify = useNotify();

        const notifyInfo = () => notify('Info', { type: 'info' });

        return <GenerationInstructions.Exclude>
            <Button onClick={notifyInfo} label="Click" />
        </GenerationInstructions.Exclude>;
    }
}

export const Warning: Story = {
    render: () => {
        const notify = useNotify();

        const notifyWarning = () => notify('Warning', { type: 'warning' });

        return <GenerationInstructions.Exclude>
            <Button onClick={notifyWarning} label="Click" />
        </GenerationInstructions.Exclude>;
    }
}

export const Undoable: Story = {
    render: () => {
        const notify = useNotify();

        const onSuccess = () => {
            notify('Success', { type: 'success', undoable: true });
        };

        return <GenerationInstructions.Exclude>
            <Edit resource="users" id={1} mutationMode="undoable" mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <TextInput source="name" />
                </SimpleForm>
            </Edit>
        </GenerationInstructions.Exclude>;
    }
}

const defaultDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext
            dataProvider={dataProvider}
            i18nProvider={defaultI18nProvider}
        >
            <Story />
            <Notification />
        </AdminContext>
    );
};

export const MultiLine: Story = {
    render: () => {
        const notify = useNotify();

        const notifySucces = () => {
            notify('This is a very long message that will be displayed on multiple lines.', { multiLine: true });
        };

        return <GenerationInstructions.Exclude>
            <Button label="click" onClick={notifySucces} />
        </GenerationInstructions.Exclude>
    }
}