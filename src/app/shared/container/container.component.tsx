import React from 'react';

import { IContainerProps } from '../Props';

import './container.styles.sass';


interface ContainerProps extends IContainerProps {
  horizontal: boolean;
  vertical: boolean;
}

function Container({
  horizontal, vertical, children, className,
}: ContainerProps) {
  const applyHorizontal = horizontal ? 'horizontal' : '';
  const applyVertical = vertical ? 'vertical' : '';

  return (
    <div className={`container ${applyHorizontal} ${applyVertical} ${className}`}>
      {children}
    </div>
  );
}

Container.defaultProps = {
  horizontal: true,
  vertical: false,
  className: '',
};

export default Container;
