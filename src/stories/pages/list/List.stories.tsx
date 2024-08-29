import type { ArgTypes, Meta, StoryObj } from "@storybook/react";
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
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CreatePageWizardParams } from "ideExtension";
import { WizardInfo } from "@amplicode/storybook-extensions";
import { Button } from "@mui/material";
import { delayDataProvider } from "../../../dataProvider";

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

// -- library

function optionProp<T>(config: {
  options: Record<string, T>;
  description?: string;
  defaultValue?: T;
}) {
  const result: any = {
    options: Object.keys(config.options),
    mapping: config.options,
    control: {
      type: "select",
    },
  };

  if (config.description) {
    result.description = config.description;
  }

  if (config.defaultValue) {
    result.defaultValue = config.defaultValue;
  }

  return result;
}

function numberProp(config: {
  description?: string;
  options?: number[];
  defaultValue?: number;
}) {
  const result: any = {
    type: config.options ? "select" : "number",
  };

  if (config.description) {
    result.description = config.description;
  }

  if (config.options) {
    result.options = config.options;
  }

  if (config.defaultValue) {
    result.defaultValue = config.defaultValue;
  }

  return result;
}

function generatorProp(config: {
  description?: string;
  generatorId: string;
  hideInStoryBook?: undefined | true;
  defaultValue?: any;
}) {
  const result: any = {
    // type: "object"
  };

  if (config.hideInStoryBook) {
    result.table = { disable: true };
  }

  if (config.description) {
    result.description = config.description;
  }

  if (config.defaultValue) {
    result.defaultValue = config.defaultValue;
  }

  return result;
}

function defaults<T>(properties: any) {
  const result: any = {};

  Object.keys(properties).forEach((propName) => {
    if ("defaultValue" in properties[propName]) {
      result[propName] = properties[propName].defaultValue;
    }
  });

  return result;
}

const DefaultCallbacks = {};

type GetComponentProps<T> = T extends (...args: any) => any
  ? Parameters<T>[0]
  : T extends { props: infer P }
    ? P
    : never;

type InspectorPropertiesType<T> = Partial<ArgTypes<GetComponentProps<T>>>;

/**
 * Indicates that referenced component should be generated in client code
 */
function copyToClient(reference: any) {
  return reference;
}

// -- library

const DefaultPagination = (props: PaginationProps) => (
  <>
    CustomPagination component{" "}
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
  </>
);

const customExporter = (posts: any[]) => {
  alert("Hello");
};

const DefaultEmpty = ({ name }: { name: string }) => (
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

const InspectorProperties: InspectorPropertiesType<typeof List> = {
  empty: optionProp({
    options: {
      default: undefined,
      "Generate Empty Page": copyToClient(<DefaultEmpty name="foo" />),
    },
    description: "The component to display when the list is empty.",
  }),

  perPage: numberProp({
    description: "Items per page",
    options: [5, 10, 20],
    defaultValue: 10,
  }),

  exporter: optionProp({
    options: {
      default: undefined,
      disabled: false,
      CustomExporter: copyToClient(customExporter),
    },
    defaultValue: undefined,
  }),

  filters: generatorProp({
    description: "The filters to display in the toolbar.",
    generatorId: "amplicode/react-admin/filtersGenerator",
    hideInStoryBook: true,
    defaultValue: [<TextInput source="name" />],
  }),

  pagination: optionProp({
    options: {
      default: undefined,
      disable: false,
      CustomPagination: copyToClient(<DefaultPagination />),
    },
    defaultValue: undefined,
  }),

  aside: optionProp({
    options: {
      default: undefined,
      AsideComponent: copyToClient(<InspectorAside />),
    },
  }),

  filterDefaultValues: generatorProp({
    description: "",
    generatorId: "amplicode/react-admin/filterDefaultValues",
    hideInStoryBook: true,
  }),

  ...DefaultCallbacks,
};

const meta = {
  title: "Pages/List",
  component: List as any,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    ...defaults(InspectorProperties),
  },
  argTypes: {
    perPage: {
      description: "Items per page",
      options: [5, 10, 20],
      defaultValue: 10,
    },
    ...(List as any),
    ...InspectorProperties,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story & WizardInfo<CreatePageWizardParams> = {
  render: ({ ...props }) => {
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

  wizardName: "pageWizard",
  info: {
    pageType: "List",
    readonlyPageType: true,
  },
};

export const Empty: Story = {
  render: ({ ...props }) => {
    return (
      <List {...props} filter={{ id: -1 }}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
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
          <DateField source="birthday" />
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
          <DateField source="birthday" />
        </Datagrid>
      </List>
    );
  },
  args: {
    role: "admin",
  },
  argTypes: {
    perPage: numberProp({
      description: "Items per page",
      options: [5, 10, 20],
      // defaultValue: 10
    }),
    role: {
      options: ["admin", "customer"],
      control: { type: "select" },
    },
  },
};

export const Aside: Story = {
  render: ({ ...props }) => {
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
  argTypes: {
    aside: optionProp({
      options: {
        default: undefined,
        AsideComponent: copyToClient(
          <SimpleForm>
            <TextInput source="name" />
          </SimpleForm>
        ),
      },
    }),
  },
};

export const Infinite: Story = {
  render: ({ ...props }) => {
    return (
      <InfiniteList filters={[<TextInput source="name" />]}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="birthday" />
        </Datagrid>
      </InfiniteList>
    );
  },
  decorators: [infiniteDecorator],
};
