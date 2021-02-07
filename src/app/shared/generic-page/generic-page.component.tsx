import React, { ReactNode } from 'react';

import './generic-pge.styles.sass';


type GenericPageProps = {
  children?: ReactNode;
}

function GenericPage({ children }: GenericPageProps) {
  return (
    <div className="page-background">
      {children}
    </div>
  );
}

export default GenericPage;
