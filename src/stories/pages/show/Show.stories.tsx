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
import { dataProvider } from "../../../dataProvider";
import { Box, Stack, Typography } from "@mui/material";
import { resourceName } from "../../../ideExtension";
import { GenerationInstructions } from "@amplicode/storybook-extensions";

const handleClick = () => {
  console.log("Custom action result");
};

const CustomShowActions = () => (
  <TopToolbar>
    <Button color="primary" onClick={handleClick} label="Custom Action" />
  </TopToolbar>
);

const CustomShowAside = () => (
  <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
    <Stack spacing={2}>
      <Typography variant="h6">Aside content</Typography>
      <Typography>Additional aside content</Typography>
    </Stack>
  </Box>
);

const meta = {
  title: "Pages/Show",
  component: Show,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    id: 1,
  },
  argTypes: {
    title: {
      control: "text",
    },
    actions: {
      control: "select",
      options: ["default", "customActions"],
      mapping: {
        default: undefined,
        customActions: <CustomShowActions />,
      },
    },
    aside: {
      control: "select",
      options: ["default", "createAside"],
      mapping: {
        default: undefined,
        createAside: <CustomShowAside />,
      },
    },
    emptyWhileLoading: {
      control: "boolean",
    },
    disableAuthentication: {
      control: "boolean",
    },
    queryOptions: {
      control: "text",
    },
  },
} satisfies Meta<typeof Show>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ resource, ...props }) => {
    return (
      <Show resource={resource} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <GenerationInstructions.Exclude>
              <TextField source="name" />
              <DateField source="date" />
          </GenerationInstructions.Exclude>
        </SimpleShowLayout>
      </Show>
    );
  },
  args: {
    resource: resourceName('users'),
  },
};

export const CustomActions: Story = {
  render: ({ ...props }) => {
    const handleClick = () => {
      alert("Custom action result");
    };

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
          <DateField source="date" />
        </SimpleShowLayout>
      </Show>
    );
  },
};

export const Aside: Story = {
  render: ({ ...props }) => {
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
          <DateField source="date" />
        </SimpleShowLayout>
      </Show>
    );
  },
};

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <ResourceContextProvider value="users">
      <Story />
    </ResourceContextProvider>
  </AdminContext>
);
