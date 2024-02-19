import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext, Button,
  defaultI18nProvider, LoadingIndicator, TextField,
  useGetOne,
} from "react-admin";
import { dataProvider, delayDataProvider } from "../../../dataProvider";
import React from "react";
// import { resourceName } from "@/ideExtension";
import { Exclude, GenerationInstructions } from "amplicode-storybook";

const meta = {
  title: "Blocks/DataProvider/UseGetOne",
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    let { data, isLoading, refetch } = useGetOne(
        'users',
        {id: 1},
    );

    return <GenerationInstructions.Exclude>
          {isLoading ? <LoadingIndicator/> : <TextField record={data} source="name"/>}
          {!isLoading && <Button label="Reload" onClick={async () => {
            data = null;
            return await refetch();
          }}/>}
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
