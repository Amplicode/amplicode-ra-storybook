import type { Meta, StoryObj } from "@storybook/react";
import { AdminContext, defaultI18nProvider, Layout, Title } from "react-admin";
import React from "react";
import { Container, Typography } from "@mui/material";

const meta = {
  title: "Layouts/Admin/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => defaultDecorator(Story)],
  // excludeStories: /.*/,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Title title="Insert anywhere, this will appear at app Toolbar" />
      </>
    );
  },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminContext i18nProvider={defaultI18nProvider}>
      <Layout menu={() => <Typography p={2}>Menu Bar</Typography>}>
        <Story />
        <Container sx={{bgcolor: '#fff', height: 500}}><Typography p={2}>
          Title inserted in the page content, but appears in toolbar. Works with
          default React Admin layout only
        </Typography></Container>
      </Layout>
    </AdminContext>
  );
};
