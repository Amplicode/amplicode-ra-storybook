import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, DateField, Labeled, defaultI18nProvider } from "react-admin";
import { dataProvider, users } from "../../../../dataProvider";

const meta = {
  title: "Blocks/Fields/DateField",
  component: DateField as any,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  args: {
    record: users[0]
  }
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <DateField source="birthday" {...props} />;
  }
};

export const Custom: Story = {
  render: ({ showTime, locales, ...props }) => {
    return (
      <DateField
        source="birthday"
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

const defaultDecorator = (Story: () => JSX.Element) => {
  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
      <Labeled>{Story()}</Labeled>
    </AdminContext>
  );
};
