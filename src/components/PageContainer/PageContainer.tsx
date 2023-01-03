import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import style from './PageContainer.style';

interface PageContainerProps {
  hasSafeArea: boolean;
  children: ReactNode;
}

const PageContainer = (props: PageContainerProps): ReactElement => {
  const { children, hasSafeArea } = props;

  if (hasSafeArea) {
    return <SafeAreaView
      style={style.container}
      edges={['left', 'right', 'bottom']}
      children={children} />
  }

  return <View style={style.container} children={children} />
};

export default PageContainer;