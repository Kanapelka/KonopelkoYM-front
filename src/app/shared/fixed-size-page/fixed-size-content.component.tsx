import React from 'react';

import { IContainerProps } from '../Props';

import './fixed-size-content.styles.sass';


interface FixedSizeContentProps extends IContainerProps{
}

function FixedSizeContent({ className, children }: FixedSizeContentProps) {
  return (
    <div className={`fixed-size-content ${className}`}>
      {children}
    </div>
  );
}

export default FixedSizeContent;
