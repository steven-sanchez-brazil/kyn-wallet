import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterSocialLogins from '@/components/RegisterSocialLogins';

describe('RegisterSocialLogins', () => {
  it('muestra alerta Proximamente al pulsar Google o Apple', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<RegisterSocialLogins />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    expect(alertSpy).toHaveBeenCalledWith('Proximamente');

    fireEvent.click(screen.getByRole('button', { name: /Apple/i }));
    expect(alertSpy).toHaveBeenCalledWith('Proximamente');

    alertSpy.mockRestore();
  });
});
