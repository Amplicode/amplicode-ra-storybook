import type { Meta, StoryObj } from "@storybook/react";
import {
    AdminContext,
    List,
    defaultI18nProvider,
    Resource,
    TextInput,
    useListContext,
    ListBase,
} from "react-admin";
import { generatorProp, topLevel } from "@amplicode/storybook-extensions";
import { Card } from "@mui/material";
import { delayDataProvider } from "../../../dataProvider";
import { resourceName } from "../../../ideExtension";

const defaultDecorator = (Story: () => JSX.Element) => (
    <AdminContext
        dataProvider={delayDataProvider}
        i18nProvider={defaultI18nProvider}
    >
        <Resource name="users" list={Story} />
    </AdminContext>
);

const meta = {
    title: "Pages/List/Base",
    component: List as any,
    decorators: [(Story) => defaultDecorator(Story)],
    args: {},
    argTypes: {
        perPage: {
            control: "select",
            description: "Items per page",
            options: [5, 10, 20],
        },
        filters: generatorProp({
            description: "The filters to display in the toolbar.",
            generatorId: "amplicode.reactAdmin.filtersGenerator",
            hideInStoryBook: true,
            defaultValue: [<TextInput source="name" />],
        }),
        disableAuthentication: {
            control: "boolean",
        },
        disableSyncWithLocation: {
            control: "boolean",
        },
        sort: {
            control: "text",
        },
        filter: {
            control: "text",
        },
        queryOptions: {
            control: "text",
        },
    },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story= {
    render: ({ resource, ...props }) => {
        const CustomList = topLevel(() => {
            const { data, isLoading, error } = useListContext();
            if (isLoading) return <>Loading</>;
            if (error) return <>{error}</>;
            if (!data || data.length === 0) return <>No data</>;
            return <>
                Users
                <ul>
                    {data?.map(item => <li>{item.name}</li>)}
                </ul>
            </>
        });

        return (
            <ListBase resource={resource} {...props}>
                <Card sx={{ width: 200 }}>
                    <CustomList />
                </Card>
            </ListBase>
        );
    },
    args: {
        resource: resourceName("user"),
    }
};
