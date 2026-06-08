import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label text', () => {
    render(<Checkbox label="Acepto los términos" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Acepto los términos')).toBeInTheDocument();
  });

  it('renders as unchecked by default', () => {
    render(<Checkbox label="Test" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders as checked when checked prop is true', () => {
    render(<Checkbox label="Test" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test" checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    render(<Checkbox label="Test" checked={false} onChange={() => {}} error="Campo requerido" />);
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
  });

  it('does not display error when error prop is not provided', () => {
    render(<Checkbox label="Test" checked={false} onChange={() => {}} />);
    expect(screen.queryByText('Campo requerido')).not.toBeInTheDocument();
  });
});
