import type { HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tv-mini-chart': HTMLAttributes<HTMLElement> & { symbol?: string };
    }
  }
}
