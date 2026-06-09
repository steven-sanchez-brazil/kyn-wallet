import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SocialLogins from './SocialLogins';

describe('SocialLogins', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
  });

  it('shows Próximamente alert for Google and Apple', () => {
    render(<SocialLogins />);

    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(window.alert).toHaveBeenCalledWith('Próximamente');

    fireEvent.click(screen.getByRole('button', { name: /apple/i }));
    expect(window.alert).toHaveBeenCalledWith('Próximamente');
  });
});
