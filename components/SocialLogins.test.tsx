import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SocialLogins } from './SocialLogins';

describe('SocialLogins', () => {
  it('should render Google and Apple buttons', () => {
    render(<SocialLogins />);
    
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument();
  });

  it('should show alert "Próximamente" when buttons are clicked', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<SocialLogins />);
    
    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(alertSpy).toHaveBeenCalledWith('Próximamente');
    
    fireEvent.click(screen.getByRole('button', { name: /apple/i }));
    expect(alertSpy).toHaveBeenCalledWith('Próximamente');
    
    alertSpy.mockRestore();
  });
});
