import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@monorepo/testing';
import React from 'react';
import { Button } from '@monorepo/ui';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-500');
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-200');
  });

  it('applies size styles correctly', () => {
    render(<Button size="large">Large</Button>);
    const button = screen.getByText('Large');
    expect(button).toHaveClass('px-6 py-3 text-lg');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { user } = render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
