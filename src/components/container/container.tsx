import { PropsWithChildren } from 'react';

import { SContainer } from '@components/container/container.styles';

export function Container({ children }: PropsWithChildren) {
  return (
    <div className={SContainer()}>
      {children}
    </div>
  );
}
