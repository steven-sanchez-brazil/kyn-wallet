declare module 'next/navigation' {
  export function useRouter(): {
    push: (href: string) => void;
  };
}

declare module 'next/link' {
  import * as React from 'react';

  interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
  }

  const Link: React.FC<LinkProps>;
  export default Link;
}
