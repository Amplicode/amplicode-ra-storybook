import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Datagrid,
  defaultI18nProvider,
  Labeled,
  RecordContextProvider,
  ReferenceArrayField,
  ResourceContextProvider,
  Show,
  SimpleList,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { dataProvider, departments } from "../../../dataProvider";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { attributeName, resourceName } from "../../../ideExtension";
import { AnyPropsComponent } from "../../../utils";
import { Typography } from "@mui/material";

const meta = {
  title: "Relations/Reference/ManyToMany",
  component: AnyPropsComponent,
  decorators: [(Story) => defaultDecorator(Story)],
  // excludeStories: /.*/,
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDatagrid: Story = {
  render: ({ subresourceName, idArrayAttributeName, ...props }) => {
    return (
      <>
        <Typography variant="body2">Department people</Typography>
        <GenerationInstructions.InsertOnly>
          <ReferenceArrayField
            source={idArrayAttributeName}
            reference={subresourceName}
          >
            <Datagrid>
              <TextField source="id" />
              {/*  use 'field' completion to generate other fields  */}
            </Datagrid>
          </ReferenceArrayField>
        </GenerationInstructions.InsertOnly>
      </>
    );
  },
  args: {
    subresourceName: resourceName("people", {
      title: "Child Resource",
      resourceId: "subresource",
      allowContext: false,
    }),
    idArrayAttributeName: attributeName("department_id", {
      resourceId: "parentResource",
      attributeSelectTitle: "Reference Attribute from Parent to Child Resource",
    }),
  },
};

export const WithSimpleList: Story = {
  render: ({ subresourceName, idArrayAttributeName, ...props }) => {
    return (
      <>
        <Typography variant="body2">Department people</Typography>
        <GenerationInstructions.InsertOnly>
          <ReferenceArrayField
            source={idArrayAttributeName}
            reference={subresourceName}
          >
            <SimpleList
              leftIcon={(record) => (
                <Typography variant="body1">Id: {record.id}</Typography>
              )}
              primaryText={(record) => record.name}
            />
          </ReferenceArrayField>
        </GenerationInstructions.InsertOnly>
      </>
    );
  },
  args: {
    subresourceName: resourceName("people", {
      title: "Child Resource",
      resourceId: "subresource",
      allowContext: false,
    }),
    idArrayAttributeName: attributeName("department_id", {
      resourceId: "parentResource",
      attributeSelectTitle: "Reference Attribute from Parent to Child Resource",
    }),
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="departments">
      <RecordContextProvider value={departments[2]}>
        <Show resource="departments" id={2}>
          <SimpleShowLayout>
            <Typography variant="h5">Department</Typography>
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
