import type { Meta, StoryObj } from "@storybook/react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import Stack from "@mui/material/Stack";
import { HashRouter } from "react-router-dom";

const meta = {
    title: "Router/HashRouter",
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        perPage: 5,
        exporter: false,
    },
    parameters: {
        docs: {
            canvas: {},
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    render: (props) => {
        const location = useLocation();

        return <Stack direction="row" gap={2}>
            <TextField label={<>Current location</>} value={location.pathname} disabled/>
            <WhooshButton/>
        </Stack>;
    },
};


const WhooshButton = () => {
    const paths = [
        '/users',
        '/departments',
        '/cats',
        '/dogs',
    ];

    const navigate = useNavigate();

    return <Button onClick={event => {
        navigate(paths[Math.floor(Math.random() * paths.length)]);
    }}>Whoosh</Button>;
};

const defaultDecorator = (Story: () => React.JSX.Element) => {

    return (
        <MemoryRouter initialEntries={['/']}>
            <HashRouter>
                <Routes>
                    <Route path={'/*'} element={<Story/>}/>
                </Routes>
            </HashRouter>
        </MemoryRouter>
    );
};