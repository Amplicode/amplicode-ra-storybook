import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";
import {
    AdminContext,
    DateInput,
    defaultI18nProvider,
    maxValue,
    minValue,
    NumberInput,
    required,
    SimpleForm
} from "react-admin";
import { dataProvider } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";
import dayjs from "dayjs";
import { topLevel } from "@amplicode/storybook-extensions";

const contextDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <SimpleForm mode="onChange" toolbar={false}>
                <Story/>
            </SimpleForm>
        </AdminContext>
    );
};

const meta = {
    title: "Inputs/DateInput",
    component: DateInput as any,
    parameters: {
        layout: "centered",
        controls: {
            exclude: ['source']
        },
    },
    decorators: [
        contextDecorator
    ],
    args: {
        source: "",
    }
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ source }) => {
        return (
            <DateInput
                source={source}
            />
        );
    },
};

export const FutureDate: Story = {
    render: () => {
        const futureDate = topLevel((date = dayjs().add(1, "day").format("YYYY-MM-DD"), message = 'Must be in the future') => {
            return minValue(date, message);
        });

        return (
            <DateInput
                source={attributeName("date")}
                validate={[futureDate(), required()]}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Valid period starts tomorrow ({dayjs().add(1, "day").format("YYYY-MM-DD")})</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story />
                </div>
            )
        }
    ]
};

export const PastDate: Story = {
    render: () => {
        const futureDate = topLevel((date = dayjs().add(-1, "day").format("YYYY-MM-DD"), message = 'Must be in the past') => {
            return maxValue(date, message);
        });

        return (
            <DateInput
                source={attributeName("date")}
                validate={[futureDate(), required()]}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Valid period ends yesterday ({dayjs().add(-1, "day").format("YYYY-MM-DD")})</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story />
                </div>
            )
        }
    ]
};

export const PeriodValidation: Story = {
    render: () => {
        const afterDate = topLevel((date = dayjs('1970-01-01').format("YYYY-MM-DD"), message = `Must be at least ${date}`) => {
            return minValue(date, message);
        });

        const beforeDate = topLevel((date = dayjs('2030-12-31').format("YYYY-MM-DD"), message = `Must be ${date} or less`) => {
            return maxValue(date, message);
        });

        return (
            <DateInput
                source={attributeName("date")}
                validate={[afterDate(), beforeDate(), required()]}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Valid period from 1970/01/01 to 2030/12/31</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story/>
                </div>
            )
        }
    ]
};

export const ExcludeDaysValidation: Story = {
    render: () => {
        const excludeWeekends = topLevel((value: string) => {
            const day = dayjs(value).day();

            if ([6, 0].includes(day)) {
                return "Only workdays are permitted"
            }

            return undefined;
        });

        return (
            <DateInput
                source={attributeName("date")}
                validate={[excludeWeekends, required()]}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Saturdays and Sundays are not valid</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story/>
                </div>
            )
        }
    ]
};
