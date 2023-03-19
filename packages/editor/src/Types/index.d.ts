import { Component, FC } from 'react';

export interface T_Edeitor_Config {
  container: HTMLElement;
}

export interface T_Stencil {
  groupName: string;
  shape: string;
  component: FC | Component;
}
