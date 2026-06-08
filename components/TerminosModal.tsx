'use client';

import React from 'react';

interface TerminosModalProps {
  onClose: () => void;
}

const TERMINOS_TEXTO = `TÉRMINOS Y CONDICIONES DE USO — KYNWALLET

Última actualización: Junio 2026

1. ACEPTACIÓN DE LOS TÉRMINOS
Al registrarte y utilizar KynWallet, aceptás cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, no debés utilizar el servicio.

2. DESCRIPCIÓN DEL SERVICIO
KynWallet es una billetera virtual que permite a sus usuarios gestionar transacciones financieras digitales, consultar saldos y realizar transferencias entre cuentas registradas en la plataforma.

3. REGISTRO DE CUENTA
Para acceder al servicio, debés registrarte proporcionando información verdadera, completa y actualizada. Sos responsable de mantener la confidencialidad de tu contraseña y de todas las actividades realizadas con tu cuenta.

4. USO ACEPTABLE
Te comprometés a usar KynWallet únicamente para fines lícitos. Está prohibido:
- Utilizar el servicio para actividades fraudulentas o ilegales.
- Intentar acceder sin autorización a los sistemas de la plataforma.
- Proporcionar información falsa durante el registro o en cualquier transacción.

5. PRIVACIDAD Y PROTECCIÓN DE DATOS
Tus datos personales serán tratados conforme a nuestra Política de Privacidad. Recopilamos únicamente la información necesaria para brindarte el servicio y nunca la compartiremos con terceros sin tu consentimiento, salvo requerimiento legal.

6. LIMITACIÓN DE RESPONSABILIDAD
KynWallet no se hace responsable por interrupciones del servicio, pérdidas de datos causadas por factores externos o daños derivados del uso incorrecto de la plataforma.

7. MODIFICACIONES
Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en la plataforma. El uso continuado del servicio implica la aceptación de los términos actualizados.

8. CONTACTO
Si tenés preguntas sobre estos Términos y Condiciones, podés contactarnos en soporte@kynwallet.com.`;

const TerminosModal: React.FC<TerminosModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminos-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-neutral-300">
          <h3 id="terminos-titulo" className="text-lg font-semibold text-neutral-900">
            Términos y Condiciones
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar términos"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-5 text-sm text-neutral-500 whitespace-pre-wrap leading-relaxed">
          {TERMINOS_TEXTO}
        </div>

        <div className="p-5 border-t border-neutral-300">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminosModal;
