/// <reference types="vite/client" />

// Allow React to be used without explicit import when using react-jsx transform
declare namespace React {
  type FC<P = {}> = import('react').FunctionComponent<P>;
  type Component<P = {}, S = {}> = import('react').Component<P, S>;
}

