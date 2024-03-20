import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, DateField, Labeled, RecordContextProvider, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";
import React from "react";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Blocks/Fields/DateField",
  component: DateField,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <DateField source={attributeName("birthday")} {...props} />;
  }
};

export const Custom: Story = {
  render: ({ showTime, locales, ...props }) => {
    return (
      <DateField
        source={attributeName("birthday")}
        showTime={showTime}
        locales={locales}
        {...props}
      />
    );
  },
  args: {
    showTime: true,
    locales: 'en-US',
  },
  argTypes: {
    locales: {
      options: ['fr-FR', 'en-US'],
      control: { type: 'select' },
    }
  }
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      <RecordContextProvider value={users[0]}>
        <Labeled>{Story()}</Labeled>
      </RecordContextProvider>
    </AdminContext>
  );
};
