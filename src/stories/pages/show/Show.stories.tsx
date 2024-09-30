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
import { dataProvider } from "../../../dataProvider";
import { WizardInfo } from "@amplicode/storybook-extensions";
import { CreatePageWizardParams } from "../../../ideExtension";

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

export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
    return (
      <Show {...props}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </SimpleShowLayout>
      </Show>
    );
  },

  wizardName: "pageWizard",
  info: {
    pageType: "Show",
    readonlyPageType: true,
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
