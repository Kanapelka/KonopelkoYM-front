import React from 'react';

import '../generic-pge.styles.sass';

interface LeftSectionProps {
  children?: React.ReactNode;
}

function LeftSection({ children }: LeftSectionProps) {
  return (
    <div className="app-bar-toolbar-section left-section">
      {children}
    </div>
  );
}

export default LeftSection;
