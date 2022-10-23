export enum Framework {
  Automatic = 'automatic',
  React = 'react',
  ReactNative = 'react-native',
}

export enum StylesLibrary {
  Automatic = 'automatic',
  StyledComponents = 'styledComponents',
  Tailwind = 'tailwind',
  CSS = 'css',
}

export interface ExtensionConfig {
  framework: Framework
  stylesLibrary: StylesLibrary
  shouldOpenCreatedComponentFile: boolean
}
