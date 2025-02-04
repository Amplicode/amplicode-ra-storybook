import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext, Button,
  defaultI18nProvider, LoadingIndicator, TextField,
  useGetOne,
} from "react-admin";
import { delayDataProvider } from "../../dataProvider";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { resourceName } from "../../ideExtension";

const meta = {
  title: "DataFetching/UseGetOne",
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    let { data, isLoading, isRefetching, refetch } = useGetOne(
        resourceName('users', { allowContext: false }),
        {id: 1},
    );

    return <GenerationInstructions.Exclude>
          {isLoading || isRefetching ? <LoadingIndicator/> : <TextField record={data} source="name"/>}
          {!isLoading && <Button label="Reload" onClick={() => refetch()}/>}
    </GenerationInstructions.Exclude>;
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext
      dataProvider={delayDataProvider}
      i18nProvider={defaultI18nProvider}
    >
      <Story />
    </AdminContext>
  );
};
