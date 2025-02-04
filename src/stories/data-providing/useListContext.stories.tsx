import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminContext,
  defaultI18nProvider,
  ListBase,
  ListContextProvider,
  useListContext,
} from "react-admin";
import React, { useState, useCallback } from "react";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { delayDataProvider } from "../../dataProvider";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Code } from "../../utils";

const docDecorator = (Story: () => React.JSX.Element) => {
  const [records, setRecords] = useState([
    { id: 1, label: "Admin" },
    { id: 2, label: "Customer" },
  ]);
  const [record, setRecord] = useState("");

  const onButtonClick = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>) => {
      setRecords((prevRecords) => [
        ...prevRecords,
        {
          id: (prevRecords.at(-1)?.id || 0) + 1,
          label: record,
        },
      ]);
    },
    [record, setRecords]
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="subtitle2">
        Whenever react-admin displays a List, it creates a{" "}
        <Code>ListContext</Code> to store the list data, as well as filters,
        pagination, sort state, and callbacks to update them.
      </Typography>
      <Typography variant="subtitle2">
        The <Code>ListContext</Code> is available to descendants of:{" "}
        <Code>&lt;List&gt;</Code>, <Code>&lt;ListGuesser&gt;</Code>,{" "}
        <Code>&lt;ListBase&gt;</Code>, <Code>&lt;ReferenceArrayField&gt;</Code>,{" "}
        <Code>&lt;ReferenceManyField&gt;</Code>.
      </Typography>
      <Typography variant="subtitle2">
        All descendant components can therefore access the list context, using
        the useListContext hook. As a matter of fact, react-admin’s{" "}
        <Code>&lt;Datagrid&gt;</Code>, <Code>&lt;FilterForm&gt;</Code>, and{" "}
        <Code>&lt;Pagination&gt;</Code> components all use the useListContext
        hook.
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          height: "500px",
          mt: 2,
          mx: 'auto',
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            mr: 2,
          }}
        >
          <Typography variant="subtitle2">
            Component that provides List context
          </Typography>
          <Stack mt={5}>
            <Typography variant="subtitle2">Roles</Typography>
            {records?.map((role) => {
              return <Typography variant="subtitle2">{role?.label}</Typography>;
            })}
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TextField
                size="small"
                disabled={false}
                value={record}
                onChange={(event: React.ChangeEvent) => {
                  setRecord((event.currentTarget as any).value);
                }}
                variant="outlined"
                sx={{ width: 120, margin: 0 }}
              />
              <Button variant={"outlined"} onClick={onButtonClick}>
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            height: "400px",
            p: 2,
          }}
        >
          <Box sx={{ height: 80, mr: 4 }}>Some inner component</Box>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "center",
              width: "60%",
              height: "300px",
              padding: 2,
            }}
          >
            <Box sx={{ height: 80 }}>
              <Typography variant="subtitle2">
                Component that needs List context
              </Typography>
            </Box>
            <ListBase resource="users">
              <ListContextProvider value={{ data: records } as any}>
                <Story />
              </ListContextProvider>
            </ListBase>
          </Paper>
        </Paper>
      </Paper>
    </Box>
  );
};

const meta = {
  title: "DataProviding/useListContext",
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
    const { data, isPending, error } = useListContext();

    return (
      <GenerationInstructions.Exclude>
        <Typography variant="subtitle2">Roles</Typography>
        {data?.map((role) => {
          return (
            <Typography variant="subtitle2">
              {role?.label.toLocaleUpperCase()}
            </Typography>
          );
        })}
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
