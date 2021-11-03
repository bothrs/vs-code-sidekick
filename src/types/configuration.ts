export enum Framework {
  React = "react",
  ReactNative = "react-native",
}

export enum ProductTeam {
  Ambient = "ambient",
  WAP = "wap",
  Commerce = "commerce",
}

export interface ExtensionConfig {
  framework: Framework;
  productTeam: ProductTeam;
}
