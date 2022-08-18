import React from "react";
import Header from "./header";
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import {render} from '@testing-library/react';

const theme = createTheme({ palette: { mode: 'dark', }, });

it("renders without crashing", () => {
	const container = document.createElement('div');
	render(<Header theme={theme}/>, container);
})