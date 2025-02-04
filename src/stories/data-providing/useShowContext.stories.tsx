import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  ShowBase,
  ShowContextProvider,
  useShowContext,
} from "react-admin";
import React, { useState } from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { delayDataProvider } from "../../dataProvider";
import { Box, Paper, Typography, TextField } from "@mui/material";
import { Code } from "../../utils";

const docDecorator = (Story: () => React.JSX.Element) => {
  const [record, setRecord] = useState({ name: "Jake" });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="subtitle2">
        <Code>useShowContext</Code> grabs the data computed by{" "}
        <Code>useShowController</Code>
        &nbsp;when inside a <Code>&lt;Show&gt;</Code> or a{" "}
        <Code>&lt;Showbase&gt;</Code> component.
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          height: "500px",
          mt: 2,
          mx: 'auto'
        }}
      >
        <Box sx={{ height: 80, display: "flex", flexDirection: "column" }}>
          Component that provides Show context
          <TextField
            size="small"
            disabled={false}
            value={record.name}
            onChange={(event: React.ChangeEvent) => {
              setRecord({ name: (event.currentTarget as any).value });
            }}
            variant="outlined"
          />
        </Box>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            height: "400px",
          }}
        >
          <Box sx={{ height: 80 }}>Some inner component</Box>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              height: "300px",
            }}
          >
            <Box sx={{ height: 80 , p: 2}}>Component that needs Show context</Box>
            <ShowBase resource="users" id={1}>
              <ShowContextProvider value={{ record } as any}>
                <Story />
              </ShowContextProvider>
            </ShowBase>
          </Paper>
        </Paper>
      </Paper>
    </Box>
  );
};

const meta = {
  title: "DataProviding/useShowContext",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => docDecorator(Story),
    (Story) => defaultDecorator(Story),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { record, isPending, error } = useShowContext();

    return (
      <GenerationInstructions.Exclude>
        {record?.name}
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
      {Story()}
    </AdminContext>
  );
};
