import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Datagrid,
  DateField,
  List,
  TextField,
  defaultI18nProvider,
  InfiniteList,
  Resource,
  SearchInput,
  TextInput,
} from "react-admin";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { dataProvider } from "../../../dataProvider";
import { CreatePageWizardInfo, WizardInfo } from "@amplicode/storybook-extensions";

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <Resource name="users" list={Story} />
  </AdminContext>
);

const infiniteDecorator = (Story: () => JSX.Element) => (
  <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
    <Resource name="users" list={Story} />
  </AdminContext>
);

const meta = {
  title: "Pages/List",
  component: List as any,
  // tags: ['autodocs'],
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    perPage: 5,
    exporter: false,
  },
  parameters: {
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story & WizardInfo<CreatePageWizardInfo> = {
  render: (props) => {
    return (
      <List {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </Datagrid>
      </List>
    );
  },

  wizardName: 'pageWizard',
  info: {
    pageType: 'List',
    readonlyPageType: true,
  }
};

export const Filter: Story = {
  render: (props) => {
    const filters = [
      <SearchInput source="name" />,
      <TextInput label="City" source="city" />,
    ];

    return (
      <List filters={filters} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="city" />
          <DateField source="birthday" />
        </Datagrid>
      </List>
    );
  },
};

export const PermanentFilter: Story = {
  render: (props) => {
    return (
      <List filter={{role: props.role}} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </Datagrid>
      </List>
    );
  },
  args: {
    role: 'admin',
  },
  argTypes: {
    role: {
      options: ['admin', 'customer'],
      control: { type: 'select' },
    },
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
      <List aside={<Aside />} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </Datagrid>
      </List>
    );
  },
};

export const Infinite: Story = {
  render: (props) => {
    return (
      <InfiniteList>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </Datagrid>
      </InfiniteList>
    );
  },
  decorators: [infiniteDecorator],
  parameters: {
    docs: {
      canvas: {},
    },
  },
};
