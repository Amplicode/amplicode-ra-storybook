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
  Pagination,
  PaginationProps,
  SimpleForm,
  CreateButton,
} from "react-admin";
import { GenerationInstructions, generatorProp } from "@amplicode/storybook-extensions";
import { Box, Button, Stack, Typography } from "@mui/material";
import { delayDataProvider } from "../../../dataProvider";
import { resourceName } from "../../../ideExtension";

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
  >
    <Resource name="users" list={Story} />
  </AdminContext>
);

const infiniteDecorator = (Story: () => JSX.Element) => (
  <AdminContext
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
  >
    <Resource name="users" list={Story} />
  </AdminContext>
);

const CustomPagination = (props: PaginationProps) => (
  <>
    CustomPagination component{" "}
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
  </>
);

const customExporter = () => {
  console.log("Export logic");
};

const CustomEmpty = ({ name }: { name: string }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No {name} available
    </Typography>
    <Typography variant="body1">
      Create one or import products from a file
    </Typography>
    <CreateButton />
    <Button onClick={() => {}}>Import</Button>
  </Box>
);

const InspectorAside = () => (
  <SimpleForm>
    <TextInput source="name" />
  </SimpleForm>
);

const meta = {
  title: "Pages/Lists/List",
  component: List as any,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {},
  argTypes: {
    perPage: {
      control: "select",
      description: "Items per page",
      options: [5, 10, 20],
    },
    empty: {
      control: "select",
      options: ["default", "Generate Empty Page"],
      mapping: {
        default: undefined,
        "Generate Empty Page": <CustomEmpty name="foo" />,
      },
    },
    exporter: {
      control: "select",
      options: ["default", "disabled", "CustomExporter"],
      mapping: {
        default: undefined,
        disabled: false,
        CustomExporter: customExporter,
      },
    },
    filters: generatorProp({
      description: "The filters to display in the toolbar.",
      generatorId: "amplicode.reactAdmin.filtersGenerator",
      hideInStoryBook: true,
      defaultValue: [<TextInput source="name" />],
    }),
    pagination: {
      control: "select",
      options: ["default", "disable", "CustomPagination"],
      mapping: {
        default: undefined,
        disable: false,
        CustomPagination: <CustomPagination />,
      },
    },
    aside: {
      control: "select",
      options: ["default", "AsideComponent"],
      mapping: {
        default: undefined,
        AsideComponent: <InspectorAside />,
      },
    },
    disableAuthentication: {
      control: "boolean",
    },
    disableSyncWithLocation: {
      control: "boolean",
    },
    sort: {
      control: "text",
    },
    filter: {
      control: "text",
    },
    queryOptions: {
      control: "text",
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ resource, ...props }) => {
    return (
      <List resource={resource} {...props}>
        <Datagrid>
          <TextField source="id" />
          <GenerationInstructions.Exclude>
            <TextField source="name" />
            <DateField source="date" />
          </GenerationInstructions.Exclude>
        </Datagrid>
      </List>
    );
  },  
  args: {
    resource: resourceName('users')
  },
};

export const Empty: Story = {
  render: ({ ...props }) => {
    return (
      <List {...props} filter={{ id: -1 }}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </List>
    );
  },
};

export const Filter: Story = {
  render: ({ ...props }) => {
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
          <DateField source="date" />
        </Datagrid>
      </List>
    );
  },
};

export const PermanentFilter: Story = {
  render: ({ role, ...props }) => {
    return (
      <List filter={{ role: role }} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </List>
    );
  },
  args: {
    role: "admin",
  },
  argTypes: {
    perPage: {
      control: "select",
      description: "Items per page",
      options: [5, 10, 20],
    },
    role: {
      options: ["admin", "customer"],
      control: { type: "select" },
    },
  },
};

export const Aside: Story = {
  render: ({ resource, ...props }) => {
    const Aside = () => (
      <Box sx={{ paddingX: 4, paddingY: 8, width: 300 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Aside content</Typography>
          <Typography>Additional aside content</Typography>
        </Stack>
      </Box>
    );

    return (
      <List resource={resource} aside={<Aside />} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </List>
    );
  },
  argTypes: {
    aside: {
      options: ["default", "AsideComponent"],
      mapping: {
        default: undefined,
        AsideComponent: (
          <SimpleForm>
            <TextInput source="name" />
          </SimpleForm>
        ),
      },
    },
  },
};

export const Infinite: Story = {
  render: () => {
    return (
      <InfiniteList filters={[<TextInput source="name" />]}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </InfiniteList>
    );
  },
  decorators: [infiniteDecorator],
};
