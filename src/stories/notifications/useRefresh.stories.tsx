import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { Admin, defaultI18nProvider, Resource, useNotify } from "react-admin";
import { delayDataProvider } from "../../dataProvider";
import { Box, Button, Typography } from "@mui/material";

const meta = {
  title: "Notifications/useNotify",
  parameters: {
    docs: {
      canvas: {},
    },
    layout: "centered",
  },
} satisfies Meta<typeof useNotify>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const notify = useNotify();
    const handleClick = () => {
      notify(`Action successfully accepted`, { type: "success" });
    };
    return (
      <GenerationInstructions.Exclude>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" pb={2}>
            This hook returns a function that displays a notification at the
            bottom of the page.
          </Typography>
          <Button variant="contained" onClick={handleClick}>
            Notify
          </Button>
        </Box>
      </GenerationInstructions.Exclude>
    );
  },
  decorators: [(Story: () => React.JSX.Element) => defaultDecorator(Story)],
};

const defaultDecorator = (Story: () => JSX.Element) => (
  <Admin
    dataProvider={delayDataProvider}
    i18nProvider={defaultI18nProvider}
    layout={Story}
  >
    <Resource name="users" list={Story} />
  </Admin>
);
