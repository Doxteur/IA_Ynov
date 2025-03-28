import React from 'react';
import { IconBaseProps } from 'react-icons';

const Icon = ({ icon: IconComponent, ...props }: { icon: any } & IconBaseProps) => {
  return <IconComponent {...props} />;
};

export default Icon;
