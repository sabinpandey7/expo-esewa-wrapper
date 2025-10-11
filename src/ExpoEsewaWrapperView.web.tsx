import * as React from 'react';

import { ExpoEsewaWrapperViewProps } from './ExpoEsewaWrapper.types';

export default function ExpoEsewaWrapperView(props: ExpoEsewaWrapperViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
