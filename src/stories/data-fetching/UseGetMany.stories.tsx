import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  Button,
  defaultI18nProvider,
  LoadingIndicator,
  TextField,
  useGetMany,
} from "react-admin";
import { delayDataProvider } from "../../dataProvider";
import React from "react";
import {
  GenerationInstructions,
  replaceOnGenerate,
} from "@amplicode/storybook-extensions";
import { resourceName } from "../../ideExtension";

const meta = {
  title: "DataFetching/UseGetMany",
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function randomIds() {
  if (Math.random() > 0.5) {
    return [3, 2, 1];
  } else {
    return [1, 2, 3];
  }
}

export const Default: Story = {
  render: () => {
    let { data, isLoading, isRefetching, refetch } = useGetMany(
      resourceName("users", { allowContext: false }),
      { ids: replaceOnGenerate(randomIds(), []) }
    );

    return (
      <GenerationInstructions.Exclude>
        {(isLoading || isRefetching) && <LoadingIndicator />}
        {!isLoading &&
          !isRefetching &&
          (data || []).map((value) => (
            <>
              <TextField record={value} source="name" />
              <p />
            </>
          ))}
        {!isLoading && !isRefetching && (
          <Button label="Reload" onClick={() => refetch()} />
        )}
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
