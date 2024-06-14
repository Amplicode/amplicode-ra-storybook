import {
  Create,
  SimpleForm,
  BooleanInput,
  DateInput,
  TextInput,
  email,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { createPortal } from "react-dom";
import { AdminStoryContext } from "../../../utils";
import { MemoryRouter } from "react-router";
import { useArgs } from "@storybook/preview-api";
import { StoryContext } from "@storybook/react";
import React from "react";
import { Paper } from "@mui/material";
import { JSX } from "react/jsx-runtime";

const FIELD_STORIES_MAP: Record<string, () => JSX.Element> = {
  BooleanInput: () => {
    return <BooleanInput source="active" />;
  },
  DateInput: () => {
    return <DateInput source="date" />;
  },
  EmailInput: () => {
    return <TextInput source="email" validate={email()} />;
  },
  NumberInput: () => {
    return <NumberInput source="day_offs" />;
  },
  ReferenceInput: () => {
    return <ReferenceInput source="department_id" reference="departments" />;
  },
  SelectInput: () => {
    const choices: { id: string; name: string }[] = [
      { id: "Moscow", name: "Moscow" },
      { id: "Samara", name: "Samara" },
      { id: "Tokyo", name: "Tokyo" },
    ];
    return <SelectInput source="city" choices={choices} />;
  },
  TextInput: () => {
    return <TextInput source="name" />;
  },
};

export const adminContextDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminStoryContext>
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    </AdminStoryContext>
  );
};

export const listDecorator = (
  Story: () => React.JSX.Element,
  context: StoryContext
) => {
  const activeStoryId = context.title.split("/").pop();

  const activeIndex = activeStoryId
    ? Object.keys(FIELD_STORIES_MAP).findIndex(
        (story) => story === activeStoryId
      )
    : undefined;

  return (
    <Create resource="users">
      <SimpleForm
        mode="onChange"
        toolbar={false}
        sx={
          activeIndex !== undefined
            ? {
                width: "300px",
                position: "fixed",
                transform: `translateY(calc(-100px * ${activeIndex}))`,
                [`& .MuiFormControl-root`]: {
                  width: "100%",
                  height: "100px",
                  margin: 0,
                },
                [`& .MuiFormGroup-root`]: {
                  width: "100%",
                  height: "100px",
                  margin: 0,
                },
                [`& .MuiFormControl-root:not(.ra-input-${context.args["source"]})`]:
                  {
                    filter: "blur(1.5px)",
                  },
                [`& .MuiFormGroup-root:not(.ra-input-${context.args["source"]})`]:
                  {
                    filter: "blur(1.5px)",
                  },
                [`& .MuiAutocomplete-root.ra-input-${context.args["source"]}`]:
                  {
                    [`& .MuiFormControl-root`]: {
                      filter: "unset",
                    },
                  },
                [`& .MuiAutocomplete-root.ra-input-${context.args["parentId"]}`]:
                  {
                    [`& .MuiFormControl-root`]: {
                      filter: "unset",
                    },
                  },
                [`& .MuiAutocomplete-root.ra-input-${context.args["attributeId"]}`]:
                  {
                    [`& .MuiFormControl-root`]: {
                      filter: "unset",
                    },
                  },
              }
            : {}
        }
      >
        {Object.entries(FIELD_STORIES_MAP).map(([id, Component]) => {
          if (context.title.match(id)) {
            return Story();
          }

          return Component();
        })}
      </SimpleForm>
    </Create>
  );
};

export const shadowArgsDecorator = (Story: () => React.JSX.Element) => {
  const [args, updateArgs, resetArgs] = useArgs();

  if (!("sortable" in args)) {
    updateArgs({ ...args, sortable: false });
  }

  return <Story />;
};

export const AdditionalInfoWrapper = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  return createPortal(
    <Paper
      style={{
        position: "fixed",
        right: "0",
        top: "0",
        bottom: 0,
        width: 200,
        height: "100%",
        padding: "48px 12px 12px 12px",
      }}
    >
      {children}
    </Paper>,
    document.body
  );
};

export const inputDecorators = [
  (Story: () => React.JSX.Element, context: StoryContext) =>
    listDecorator(Story, context),
  (Story: () => React.JSX.Element) => adminContextDecorator(Story),
  (Story: () => React.JSX.Element) => shadowArgsDecorator(Story),
];
