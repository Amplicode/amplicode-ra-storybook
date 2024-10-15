import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  Create,
  CreateBase,
  DateInput,
  defaultI18nProvider,
  Identifier,
  ResourceContextProvider,
  SimpleForm,
  TextInput,
  Title,
  TopToolbar,
} from "react-admin";
import { dataProvider } from "../../../dataProvider";
import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";

const createRedirectFunc = (
  resource?: string,
  id?: Identifier,
) => {
  return `/redirect/to/${resource}/${id}`;
};

const createTransformFunc = (record: any) => ({...record});

const handleClick = () => {
  console.log("Custom action result");
};

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
  render: ({ ...props }) => {
    return (
      <CreateBase {...props}>
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
};

const defaultDecorator = (Story: () => React.JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
