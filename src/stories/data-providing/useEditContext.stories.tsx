import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  EditBase,
  EditContextProvider,
  useEditContext,
} from "react-admin";
import React, { useState } from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { delayDataProvider } from "../../dataProvider";
import { Box, Paper, Typography, TextField } from "@mui/material";
import { Code } from "../../utils";

const docDecorator = (Story: () => React.JSX.Element) => {
  const [record, setRecord] = useState({ name: "Bill" });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="subtitle2">Whenever react-admin displays an edition
        page, it creates an <Code>EditContext</Code> to store the record, the
        submit callback, and other data.</Typography>
      <Typography variant="subtitle2">
        The <Code>EditContext</Code> is available to descendants of:{" "}
        <Code>&lt;EditGuesser&gt;</Code>{" "}
        <Code>&lt;EditBase&gt;</Code>.
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
          Component that provides Edit context
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
            <Box sx={{ height: 80 }}>Component that needs Edit context</Box>
            <EditBase resource="users" id={1}>
              <EditContextProvider value={{ record } as any}>
                <Story />
              </EditContextProvider>
            </EditBase>
          </Paper>
        </Paper>
      </Paper>
    </Box>
  );
};

const meta = {
  title: "DataProviding/useEditContext",
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
    const { record, isPending, error } = useEditContext();

    return (
      <GenerationInstructions.Exclude>
        <Typography variant="subtitle2">{record?.name}</Typography>
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
