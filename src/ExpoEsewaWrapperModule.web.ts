import { registerWebModule, NativeModule } from 'expo';

import { ExpoEsewaWrapperModuleEvents } from './ExpoEsewaWrapper.types';

class ExpoEsewaWrapperModule extends NativeModule<ExpoEsewaWrapperModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoEsewaWrapperModule, 'ExpoEsewaWrapperModule');
