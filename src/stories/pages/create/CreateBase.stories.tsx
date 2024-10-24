import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Create,
  CreateBase,
  DateInput,
  defaultI18nProvider,
  Identifier,
  ResourceContextProvider,
  SimpleForm,
  TextInput,
  Title,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { Card } from "@mui/material";
import { resourceName } from "../../../ideExtension";

const createRedirectFunc = (
  resource?: string,
  id?: Identifier,
) => {
  return `/redirect/to/${resource}/${id}`;
};

const createTransformFunc = (record: any) => ({...record});

const meta = {
  title: "Pages/Create/Base",
  component: Create as any,
  decorators: [(Story) => defaultDecorator(Story)],
  argTypes: {
    redirect: {
      control: "select",
      options: ["list", "edit", "show", "disable", "redirectToFunction"],
      mapping: {
        list: "list",
        show: "show",
        disable: false,
        redirectToFunction: createRedirectFunc,
      },
    },
    disableAuthentication: {
      control: 'boolean'
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
} satisfies Meta<typeof Create>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ resource, ...props }) => {
    return (
      <CreateBase resource={resource} {...props}>
        <Title title={"Create"}/>
        <Card sx={{width: '300px'}}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="date" />
        </SimpleForm>
        </Card>
      </CreateBase>
    );
  },
  args: {
    resource: resourceName('user'),
  }
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
