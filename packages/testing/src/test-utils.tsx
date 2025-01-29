import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface WrapperProps {
  children: React.ReactNode;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<WrapperProps>;
}

type UserEventInstance = ReturnType<typeof userEvent.setup>;

interface CustomRenderResult extends RenderResult {
  user: UserEventInstance;
}

function DefaultWrapper({ children }: WrapperProps) {
  return <>{children}</>;
}

function customRender(
  ui: React.ReactElement,
  { wrapper: Wrapper = DefaultWrapper, ...options }: CustomRenderOptions = {}
): CustomRenderResult {
  const user = userEvent.setup();
  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...options });
  return { user, ...renderResult };
}

export * from '@testing-library/react';
export { customRender as render };
export { userEvent };
