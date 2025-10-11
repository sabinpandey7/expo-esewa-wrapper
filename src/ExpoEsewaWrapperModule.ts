import { NativeModule, requireNativeModule } from 'expo';

import { ExpoEsewaWrapperModuleEvents } from './ExpoEsewaWrapper.types';

declare class ExpoEsewaWrapperModule extends NativeModule<ExpoEsewaWrapperModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoEsewaWrapperModule>('ExpoEsewaWrapper');
