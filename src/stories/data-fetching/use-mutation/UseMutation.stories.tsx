import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  defaultI18nProvider,
  useDataProvider,
} from "react-admin";
import { useMutation, QueryClient } from "react-query";
import { dataProvider, users } from "../../../dataProvider";
import { Typography } from "@mui/material";
import React from "react";

const meta = {
  title: "Blocks/DataFetching/UseMutation",
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    record: users[0],
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // decorators: [(Story) => {
  //   return (
  //     <div>
  //       <Button label="Update user" onClick={() => mutate()} disabled={isLoading} />
  //     </div>
  //   )
  // }],
  render: ({record, name, ...props}: any) => {
    const dataProvider = useDataProvider();
    const { mutate, isLoading } = useMutation(() =>
      dataProvider.update("users", {
        id: record.id,
        data: { name },
        previousData: record,
      })
    );

    return (
      <div>
        <Typography>ID: {record.id}</Typography>
        <Typography>Name: {record.name}</Typography>
        {/** illustrate update like notification */}
        <Button label="Update user" onClick={() => mutate()} disabled={isLoading} />
      </div>
    );
  },
  args: {
    name: 'Burr',
  }
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        structuralSharing: false,
      },
      mutations: {
        retryDelay: 10000,
      },
    },
  });

  return (
    <AdminContext
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
      // queryClient={queryClient}
    >
      <Story />
    </AdminContext>
  );
};
