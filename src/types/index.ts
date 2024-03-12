import type { ComponentType } from "react";
import type { ActionFunction, LoaderFunction } from "react-router-dom";

export interface IRoute<T> {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: ComponentType<T>;
}

export interface RouteCreation<T, E> extends IRoute<E> {
  path: string;
  Element: ComponentType<T>;
}

export interface Page<T, E> extends IRoute<E> {
  default: ComponentType<T>;
}

export interface Pages<T, E> {
  [filename: string]: Page<T, E>;
}

export type PageInitialProps = {
  pathname?: string;
};
