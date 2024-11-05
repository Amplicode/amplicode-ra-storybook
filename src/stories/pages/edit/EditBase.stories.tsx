import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  DateInput,
  defaultI18nProvider,
  Edit,
  EditBase,
  Identifier,
  ResourceContextProvider,
  SimpleForm,
  TextInput,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { resourceName } from "../../../ideExtension";
import { Card } from "@mui/material";


const editRedirectFunc = (
  resource?: string,
  id?: Identifier,
) => {
  return `/redirect/to/${resource}/${id}`;
};

const createTransformFunc = (record: any) => ({...record});

const meta = {
  title: "Pages/Edit/Base",
  component: Edit,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 2,
  },
  argTypes: {
    redirect: {
      control: "select",
      options: ["list", "edit", "show", "disable", "redirectToFunction"],
      mapping: {
        list: "list",
        show: "show",
        disable: false,
        redirectToFunction: editRedirectFunc,
      },
    },
    disableAuthentication: {
      control: 'boolean'
    },
    mutationMode: {
      control: "select",
      options: ["pessimistic", "optimistic", "undoable"]
    },
    mutationOptions: {
      control: "text"
    },
    transform: {
        control: "select",
        options: ["default", "transformFunction"],
        mapping: {
            default: undefined,
            transformFunction: createTransformFunc,
        },
    },
  },
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story ={
  render: ({ resource, ...props }) => {
    return (
      <EditBase resource={resource} {...props}>
        <Card>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
        </Card>
      </EditBase>
    );
  },
  args: {
    resource: resourceName('users'),
  }
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
