import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, FileField, defaultI18nProvider, RecordContextProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Fields/FileField",
  component: FileField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof FileField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({...props}) => {
    return <FileField source={attributeName("url")} title="Presentation"/>;
  },
  decorators: [
    (Story) => {
      return (
          <RecordContextProvider value={{url: 'http://google.com'}}>
            {Story()}
          </RecordContextProvider>
      );
    }
  ]
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      {Story()}
    </AdminContext>
  );
};
