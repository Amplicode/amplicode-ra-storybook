import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  InfiniteList,
  defaultI18nProvider,
  Resource,
  TextInput,
  Datagrid,
  TextField,
  DateField,
  useInfinitePaginationContext,
} from "react-admin";
import { generatorProp } from "@amplicode/storybook-extensions";
import { delayDataProvider } from "../../../dataProvider";
import { Box, Button } from "@mui/material";

const LoadMoreButton = () => {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitePaginationContext();
  return hasNextPage ? (
    <Box mt={1} textAlign="center">
      <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load more
      </Button>
    </Box>
  ) : null;
};

const defaultDecorator = (Story: () => JSX.Element) => (
  <AdminContext
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
  >
    <Resource name="users" list={Story} />
  </AdminContext>
);

const meta = {
  title: "Pages/Lists/InfiniteList",
  component: InfiniteList as any,
  decorators: [(Story) => defaultDecorator(Story)],
  args: {},
  argTypes: {
    perPage: {
      control: "select",
      description: "Items per page",
      options: [5, 10, 20],
    },
    filters: generatorProp({
      description: "The filters to display in the toolbar.",
      generatorId: "amplicode.reactAdmin.filtersGenerator",
      hideInStoryBook: true,
      defaultValue: [<TextInput source="name" />],
    }),
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
    pagination: {
      control: "select",
      options: ["default", "LoadMoreButton"],
      mapping: {
        default: undefined,
        LoadMoreButton: <LoadMoreButton />,
      },
    },
  },
} satisfies Meta<typeof InfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return (
      <InfiniteList {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </InfiniteList>
    );
  },
};

const Test = () => {
  return <div>Test</div>
}

export const LoadMore: Story = {
  render: ({ ...props }) => {
    const LoadMoreButton = () => {
      const { hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfinitePaginationContext();
      return hasNextPage ? (
        <Box mt={1} textAlign="center">
          <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
            Load more
          </Button>
          <Test />
        </Box>
      ) : null;
    };

    return (
      <InfiniteList {...props} pagination={<LoadMoreButton />}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="date" />
        </Datagrid>
      </InfiniteList>
    );
  },
};
