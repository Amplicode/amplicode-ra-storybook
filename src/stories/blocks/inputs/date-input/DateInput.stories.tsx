import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";
import {
  DateInput,
  maxValue,
  minValue,
  NumberInput,
  required,
} from "react-admin";
import dayjs from "dayjs";
import { topLevel } from "@amplicode/storybook-extensions";
import { AdditionalInfoWrapper, inputDecorators } from "../inputDecorators";
import { attributeName } from "../../../../ideExtension";

const meta = {
  title: "Inputs/DateInput",
  component: DateInput,
  parameters: {
    // layout: "centered",
    controls: {
      exclude: ["source", "fullWidth", "helperText", "parse", "validate"],
    },
  },
  decorators: [...inputDecorators],
  args: {
    source: "date",
  },
  argTypes: {
    fullWidth: {
      control: "boolean",
    },
    helperText: {
      control: "text",
    },
    parse: {
      control: "text",
    },
    validate: {
      control: "text",
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    return <DateInput source={attributeName("date")} {...props} />;
  },
};

export const FutureDate: Story = {
  render: ({ source, validate, ...props }) => {
    const futureDate = topLevel((date = dayjs()
      .add(1, "day")
      .format("YYYY-MM-DD"), message = "Must be in the future") => {
      return minValue(date, message);
    });

    return (
      <DateInput
        source={attributeName("date")}
        validate={[futureDate(), required()]}
        {...props}
      />
    );
  },
  decorators: [
    (Story) => {
      return (
        <>
          <AdditionalInfoWrapper>
            <Typography variant="body2">
              Valid period starts tomorrow (
              {dayjs().add(1, "day").format("YYYY-MM-DD")})
            </Typography>
            <Typography variant="body2">Validation mode "onChange"</Typography>
          </AdditionalInfoWrapper>
          <Story />
        </>
      );
    },
  ],
};

export const PeriodValidation: Story = {
  render: ({ source, validate, ...props }) => {
    const afterDate = topLevel(
      (
        date = dayjs("1970-01-01").format("YYYY-MM-DD"),
        message = `Must be at least ${date}`
      ) => {
        return minValue(date, message);
      }
    );

    const beforeDate = topLevel(
      (
        date = dayjs("2030-12-31").format("YYYY-MM-DD"),
        message = `Must be ${date} or less`
      ) => {
        return maxValue(date, message);
      }
    );

    return (
      <DateInput
        source={attributeName("date")}
        validate={[afterDate(), beforeDate(), required()]}
        {...props}
      />
    );
  },
  decorators: [
    (Story) => {
      return (
        <>
          <AdditionalInfoWrapper>
            <Typography variant="body2">
              Valid period from 1970/01/01 to 2030/12/31
            </Typography>
            <Typography variant="body2">Validation mode "onChange"</Typography>
          </AdditionalInfoWrapper>
          <Story />
        </>
      );
    },
  ],
};

export const ExcludeDaysValidation: Story = {
  render: ({ source, validate, ...props }) => {
    const excludeWeekends = topLevel((value: string) => {
      const day = dayjs(value).day();

      if ([6, 0].includes(day)) {
        return "Only workdays are permitted";
      }

      return undefined;
    });

    return (
      <DateInput
        source={attributeName("date")}
        validate={[excludeWeekends, required()]}
        {...props}
      />
    );
  },
  decorators: [
    (Story) => {
      return (
        <>
          <AdditionalInfoWrapper>
            <Typography variant="body2">
              Saturdays and Sundays are not valid
            </Typography>
            <Typography variant="body2">Validation mode "onChange"</Typography>
          </AdditionalInfoWrapper>
          <Story />
        </>
      );
    },
  ],
};
