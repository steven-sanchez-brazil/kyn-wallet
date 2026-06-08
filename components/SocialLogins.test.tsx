import React from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SocialLogins from './SocialLogins';

describe('SocialLogins', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows register divider text in register mode', () => {
    render(<SocialLogins mode="register" />);

    expect(screen.getByText(/o regístrate con/i)).toBeInTheDocument();
  });

  it('shows exact coming soon alert for social providers', () => {
    render(<SocialLogins mode="register" />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));

    expect(window.alert).toHaveBeenCalledWith('Próximamente');
  });
});
