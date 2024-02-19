import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Create,
  defaultI18nProvider,
  TextInput,
  DateInput,
  SimpleForm,
  TopToolbar,
  Button,
  ResourceContextProvider,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { dataProvider } from "../../../dataProvider";
import React from "react";

const meta = {
  title: "Pages/Create",
  component: Create as any,
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof Create>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <Create {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="birthday" />
        </SimpleForm>
      </Create>
    );
  },
};

export const CustomActions: Story = {
  render: (props) => {
    const handleClick = () => {
      alert('Custom action result');
    }

    const CustomActions = () => (
      <TopToolbar>
        <Button color="primary" onClick={handleClick} label="Custom Action" />
      </TopToolbar>
    );

    return (
      <Create actions={<CustomActions />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="birthday" />
        </SimpleForm>
      </Create>
    );
  },
};

export const Aside: Story = {
  render: (props) => {
    const Aside = () => (
      <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Aside content</Typography>
          <Typography>Additional aside content</Typography>
        </Stack>
      </Box>
    );

    return (
      <Create aside={<Aside />} {...props}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <DateInput source="birthday" />
        </SimpleForm>
      </Create>
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
