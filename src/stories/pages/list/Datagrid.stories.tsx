import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  Resource,
  Datagrid,
  ListBase,
  TextField,
  DateField,
  Identifier,
  RaRecord,
} from "react-admin";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { delayDataProvider } from "../../../dataProvider";
import { Box, Typography } from "@mui/material";
import { Code } from "../../../utils";

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
  >
    <Resource name="users" list={Story} />
  </AdminContext>
);

const rowClick = (_id: Identifier, _resource: string, record: RaRecord) =>
  record.editable ? "edit" : "show";

const ExpandbleComponent = () => {
  return (
    <div>ExpandbleComponent</div>
  )
};

const isRowExpandble = (record: any) => {
  // works with 'expand' prop passed
  return record.hasAdditionalInfo;
};

const isRowSelectable = (record: any) => {
  return record.hasAdditionalInfo;
};

const meta = {
  title: "Pages/Lists/Datagrid",
  component: Datagrid,
  decorators: [
    (Story) => defaultDecorator(Story),
    (Story) => {
      return (
        <Box>
          <Typography variant="subtitle2">
            The <Code>&lt;Datagrid&gt;</Code> component renders a list of
            records as a table. It supports sorting, row selection for bulk
            actions, and an expand panel. It is usually used as a descendant of
            the <Code>&lt;List&gt;</Code> and{" "}
            <Code>&lt;ReferenceManyField&gt;</Code> components. Outside these
            components, it must be used inside a ListContext.
          </Typography>
          <Box mt={2}>
            <Story />
          </Box>
        </Box>
      );
    },
  ],
  args: {},
  argTypes: {
    rowClick: {
      control: "select",
      options: [
        "default",
        "show",
        "edit",
        "expand",
        "toggleSelection",
        "false",
        "GenerateRowClick",
      ],
      mapping: {
        default: undefined,
        show: "show",
        edit: "edit",
        expand: "expand",
        toggleSelection: "toggleSelection",
        GenerateRowClick: rowClick,
        false: false,
      },
    },
    expand: {
      control: "select",
      options: ["default", "GenerateExpandbleComponent"],
      mapping: {
        default: undefined,
        GenerateExpandbleComponent: ExpandbleComponent,
      },
    },
    isRowExpandable: {
      control: "select",
      options: ["default", "GenerateRowExpandble"],
      mapping: {
        default: undefined,
        GenerateRowExpandble: isRowExpandble,
      },
    },
    isRowSelectable: {
      control: "select",
      options: ["default", "GenerateRowSelectable"],
      mapping: {
        default: undefined,
        GenerateRowSelectable: isRowSelectable,
      },
    },
  },
} satisfies Meta<typeof Datagrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return (
      <ListBase>
        <GenerationInstructions.InsertOnly>
          <Datagrid {...props}>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="date" />
          </Datagrid>
        </GenerationInstructions.InsertOnly>
      </ListBase>
    );
  },
};
