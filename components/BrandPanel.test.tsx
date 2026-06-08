import { render, screen } from '@testing-library/react';
import BrandPanel from './BrandPanel';

describe('BrandPanel', () => {
  it('renders default headline and subtitle when no props are passed', () => {
    render(<BrandPanel />);
    expect(screen.getByText('Tu dinero,')).toBeInTheDocument();
    expect(screen.getByText('sin fronteras.')).toBeInTheDocument();
    expect(screen.getByText('Envía, recibe y paga en segundos. Una billetera pensada para tu día a día.')).toBeInTheDocument();
  });

  it('renders custom headline when headline prop is passed', () => {
    render(<BrandPanel headline={['Comienza tu', 'camino financiero.']} />);
    expect(screen.getByText('Comienza tu')).toBeInTheDocument();
    expect(screen.getByText('camino financiero.')).toBeInTheDocument();
    expect(screen.queryByText('Tu dinero,')).not.toBeInTheDocument();
  });

  it('renders custom subtitle when subtitle prop is passed', () => {
    render(<BrandPanel subtitle="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar." />);
    expect(screen.getByText('Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.')).toBeInTheDocument();
    expect(screen.queryByText('Envía, recibe y paga en segundos. Una billetera pensada para tu día a día.')).not.toBeInTheDocument();
  });

  it('renders both custom headline and subtitle together', () => {
    render(
      <BrandPanel
        headline={['Comienza tu', 'camino financiero.']}
        subtitle="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."
      />
    );
    expect(screen.getByText('Comienza tu')).toBeInTheDocument();
    expect(screen.getByText('camino financiero.')).toBeInTheDocument();
    expect(screen.getByText('Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.')).toBeInTheDocument();
  });

  it('always renders KynWallet logo text', () => {
    render(<BrandPanel headline={['Custom', 'Title']} />);
    expect(screen.getByText('KynWallet')).toBeInTheDocument();
  });
});
