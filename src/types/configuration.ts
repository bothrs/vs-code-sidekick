export enum Framework {
  Automatic = 'automatic',
  React = 'react',
  ReactNative = 'react-native',
}

export interface ExtensionConfig {
  framework: Framework
  shouldOpenCreatedComponentFile: boolean
}
