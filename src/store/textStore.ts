import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TextState } from './types';
import { migrations, VERSION } from './migrations';

export const useTextStore = create<TextState>()(
  persist(
    (set) => ({
      history: [],
      currentText: '',
      addToHistory: (text: string) =>
        set((state) => {
          // Only add to history if text is different from the last entry
          const lastEntry = state.history[0];
          if (lastEntry && lastEntry.text === text) {
            return state;
          }
          return {
            history: [
              {
                id: crypto.randomUUID(),
                text,
                timestamp: Date.now(),
              },
              ...state.history,
            ].slice(0, 10), // Keep only last 10 entries
          };
        }),
      clearHistory: () => set({ history: [] }),
      loadFromHistory: (text: string) => set({ currentText: text }),
      setText: (text: string) => set({ currentText: text }),
    }),
    {
      name: 'text-history',
      version: VERSION,
      migrate: (persistedState: any, version: number) => {
        let state = persistedState;
        
        // Apply each migration sequentially
        while (version < VERSION) {
          if (migrations[version]) {
            state = migrations[version](state);
          }
          version++;
        }
        
        return state as TextState;
      },
    }
  )
);