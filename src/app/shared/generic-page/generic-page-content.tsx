import React from 'react';

import { IContainerProps } from '../Props';

import './generic-pge.styles.sass';


interface GenericPageProps extends IContainerProps {
}

function GenericPageContent({ children, className }: GenericPageProps) {
  return (
    <div className={`page-content ${className}`}>
      {children}
    </div>
  );
}

export default GenericPageContent;
