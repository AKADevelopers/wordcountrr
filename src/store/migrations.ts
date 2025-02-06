import { TextState } from './types';

export type Migration = (state: any) => TextState;
export type Migrations = { [key: number]: Migration };

export const migrations: Migrations = {
  0: (state: any): TextState => ({
    ...state,
    history: [],
    currentText: '',
  }),
  1: (state: any): TextState => ({
    ...state,
    history: state.history || [],
    currentText: state.currentText || '',
  }),
};

export const VERSION = 1;