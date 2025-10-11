import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoEsewaWrapperViewProps } from './ExpoEsewaWrapper.types';

const NativeView: React.ComponentType<ExpoEsewaWrapperViewProps> =
  requireNativeView('ExpoEsewaWrapper');

export default function ExpoEsewaWrapperView(props: ExpoEsewaWrapperViewProps) {
  return <NativeView {...props} />;
}
