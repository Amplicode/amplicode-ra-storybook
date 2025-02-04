import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  defaultI18nProvider,
  useCreate,
} from "react-admin";
import { delayDataProvider } from "../../dataProvider";
import React from "react";
import {
  GenerationInstructions,
  replaceOnGenerate,
} from "@amplicode/storybook-extensions";
import { resourceName } from "../../ideExtension";

const meta = {
  title: "DataFetching/UseCreate",
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    let [create, { data, isLoading }] = useCreate(
      resourceName("users", { allowContext: false }),
      {
        data: replaceOnGenerate({ name: "New user" }, {}),
      }
    );

    return (
      <GenerationInstructions.Exclude>
        <Button label="Create" onClick={() => create()} />
        <p />
        {isLoading && "Loading"}
        {data && <>Created: {data.name}</>}
      </GenerationInstructions.Exclude>
    );
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
