import { GenerationInstructions, topLevel } from "@amplicode/storybook-extensions";
import { Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { dataProvider, users } from "../../../dataProvider";
import { attributeName, resourceName } from "../../../ideExtension";
import { useState, useEffect } from "react";
import { AdminContext, defaultI18nProvider, Labeled, ListContextProvider, ListControllerResult, RecordContextProvider, ReferenceField, ReferenceManyField, ResourceContextProvider, Show, SimpleList, SimpleShowLayout, TextField, useDataProvider, useListContext } from "react-admin";
import { AnyPropsComponent } from "../../../utils";

const meta = {
    title: "Relations/Reference/ListContextAdapter",
    component: AnyPropsComponent,
    decorators: [(Story) => defaultDecorator(Story)],
    // excludeStories: /.*/,
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Deafult: Story = {
    render: () => {
        const ListContextAdapter = topLevel(({
            children,
        }: {
            children: React.ReactNode,
        }) => {
            const listContext = useListContext();
            const [modifiedData, setModifiedData] = useState<unknown[]>();

            useEffect(() => {
                if (listContext.data) {
                    // Write necessary data processing here 
                    setModifiedData(listContext.data);
                }

            }, [listContext.data]);
            let value: ListControllerResult
            if (listContext.isLoading
                || listContext.isPending
                || listContext.isFetching
                || listContext.error
                || !modifiedData
            ) {
                value = {
                    ...listContext,
                };
            } else {
                value = {
                    ...listContext,
                    data: modifiedData,
                }
            }

            return <ListContextProvider value={value}>
                {children}
            </ListContextProvider>
        });



        return <ReferenceManyField
            reference={"userCompetences"}
            target={"userId"}
        >
            <GenerationInstructions.InsertOnly>
                <ListContextAdapter >
                    <SimpleList
                        primaryText={record => `${record.grade} ${record.name}`}
                        secondaryText={record => record.description}
                    />
                </ListContextAdapter>
            </GenerationInstructions.InsertOnly>
        </ReferenceManyField>
    },
}

export const WithDataFetching: Story = {
    render: ({ reference, source }) => {

        const ListContextAdapter = topLevel(({
            children,
            reference: resource,
            source,
        }: {
            children: React.ReactNode,
            source: string,
            reference: string,

        }) => {
            const listContext = useListContext();
            const [joinedData, setJoinedData] = useState<any[]>();
            const dataProvider = useDataProvider();
            useEffect(() => {
                const updateChildrenState = async (data: any[]) => {
                    const { data: children } = await dataProvider.getMany(resource, {
                        ids: data.map(parentRecord => parentRecord[source]),
                    });

                    const joinedData = data.map(parentRecord => {
                        const childRecord = children.find(child => child.id === parentRecord[source])!;
                        return { ...parentRecord, ...childRecord };
                    })
                    setJoinedData(joinedData);
                }

                if (listContext.data) {
                    updateChildrenState(listContext.data);
                }
            }, [listContext.data, dataProvider]);
            let value: ListControllerResult
            if (listContext.isLoading
                || listContext.isPending
                || listContext.isFetching
                || listContext.error
                || !joinedData
            ) {
                value = {
                    ...listContext,
                };
            } else {
                value = {
                    ...listContext,
                    data: joinedData,
                }
            }

            return <ListContextProvider value={value}>
                {children}
            </ListContextProvider>
        });



        return <ReferenceManyField
            reference={"userCompetences"}
            target={"userId"}
        >
            <GenerationInstructions.InsertOnly>
                <ListContextAdapter reference={reference} source={source}>
                    <SimpleList
                        primaryText={record => `${record.grade} ${record.name}`}
                        secondaryText={record => record.description}
                    />
                </ListContextAdapter>
            </GenerationInstructions.InsertOnly>
        </ReferenceManyField>
    },
    args: {
        reference: resourceName("competences", {
            title: 'Child Resource',
            resourceId: 'subresource',
            allowContext: false,
        }),
        source: attributeName("competenceId",
            {
                resourceId: 'parentResource',
                attributeSelectTitle: 'Reference Attribute from JoinResource Resource to Child Resource'
            }
        )
    }
}


const defaultDecorator = (Story: () => React.JSX.Element) => (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
        <ResourceContextProvider value="people">
            <RecordContextProvider value={users[1]}>
                <Show resource='people' id={1}>
                    <SimpleShowLayout>
                        <Typography variant="body1">Custom component for modifying list context</Typography>
                        <Typography variant="h5">User</Typography>
                        <Labeled>
                            <TextField source="id" />
                        </Labeled>
                        <Labeled>
                            <TextField source="name" />
                        </Labeled>
                        <Story />
                    </SimpleShowLayout>
                </Show>
            </RecordContextProvider>
        </ResourceContextProvider>
    </AdminContext>
);
