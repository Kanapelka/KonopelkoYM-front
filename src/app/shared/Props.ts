import { MouseEventHandler, ReactNode } from 'react';

export interface IStyledComponentProps {
  className?: string;
}

export interface IParenComponentProps {
  children?: ReactNode;
}

export interface IContainerProps extends IStyledComponentProps, IParenComponentProps {
}

export type Color = 'inherit' | 'primary' | 'secondary' | 'default';

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLElement>
  color?: Color;
}

export interface LinkProps {
  link: string;
}

export interface ToolTipProps {
  tooltip: string;
}

export interface IPageProps {
  setNavigation: Function;
}
