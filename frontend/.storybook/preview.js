import React from 'react';
import { AppProvider } from '../src/providers/app';
import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/custom.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <AppProvider>
      <Story />
    </AppProvider>
  ),
];
