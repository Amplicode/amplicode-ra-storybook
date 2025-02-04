import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  Resource,
  SingleFieldList,
  ChipField,
  ListBase,
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

const meta = {
  title: "Pages/Lists/SingleFieldList",
  component: SingleFieldList,
  decorators: [
    (Story) => defaultDecorator(Story),
    (Story) => {
      return (
        <Box>
          <Typography variant="subtitle2">
            Use <Code>&lt;SingleFieldList&gt;</Code> when you want to display
            only one property for each record in a list, for instance, to
            display the list of tag names for a post.
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
    linkType: {
      control: "select",
      options: ["default", "show", "edit", "false"],
      mapping: {
        default: undefined,
        show: "show",
        edit: "edit",
        false: false,
      },
    },
  },
} satisfies Meta<typeof SingleFieldList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return (
      <ListBase>
        <GenerationInstructions.InsertOnly>
          <SingleFieldList {...props}>
            <ChipField source="name" />
          </SingleFieldList>
        </GenerationInstructions.InsertOnly>
      </ListBase>
    );
  },
};
