import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  DateField,
  ResourceContextProvider,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  defaultI18nProvider,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { dataProvider } from "../../../../dataProvider";

const meta = {
  title: "Generic/Views/Show",
  component: Show as any,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 1,
  }
} satisfies Meta<typeof Show>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <Show {...props}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </SimpleShowLayout>
      </Show>
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
      <Show actions={<CustomActions />} {...props}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </SimpleShowLayout>
      </Show>
    );
  }
};

export const Aside: Story = {
  render: (props) => {
    const Aside = () => (
      <Box sx={{ paddingX: 4, paddingY: 4, width: 300 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Aside content</Typography>
          <Typography>Additional aside content</Typography>
        </Stack>
      </Box>
    );
    
    return (
      <Show aside={<Aside />} {...props}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </SimpleShowLayout>
      </Show>
    );
  }
};

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
