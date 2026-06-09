import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BrandPanel from './BrandPanel';

describe('BrandPanel', () => {
  it('should render default login copy', () => {
    render(<BrandPanel />);

    expect(screen.getByText('Tu dinero,')).toBeInTheDocument();
    expect(screen.getByText('sin fronteras.')).toBeInTheDocument();
    expect(
      screen.getByText('Envía, recibe y paga en segundos. Una billetera pensada para tu día a día.')
    ).toBeInTheDocument();
  });

  it('should render custom register copy from props', () => {
    render(
      <BrandPanel
        title="Comienza tu camino financiero."
        subtitle="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."
      />
    );

    expect(screen.getByText('Comienza tu camino financiero.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.'
      )
    ).toBeInTheDocument();
  });
});