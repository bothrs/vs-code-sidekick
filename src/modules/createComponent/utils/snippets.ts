import { Framework } from '../../../types/configuration'

export const REACT_IMPORT = "import React from 'react'"
export const REACT_NATIVE_IMPORT =
  "import { StyleProp, ViewStyle } from 'react-native'"

export const REACT_IMPORT_FC = "import React, { FC } from 'react'"

export const generateStyledComponentsImport = (
  framework: Framework.React | Framework.ReactNative
) => {
  return `import styled from 'styled-components${
    framework === Framework.ReactNative ? '/native' : ''
  }'`
}

export const generateStyledFileImport = (componentName: string) => {
  return `import { Container } from './${componentName}.style'`
}

export const generatePropsInterface = () => {
  return `interface Props {
    style?: StyleProp<ViewStyle>;
  }`
}

export const generateStyledComponent = (
  framework: Framework.React | Framework.ReactNative
) => {
  return `const Container = styled.${
    framework === Framework.ReactNative ? 'View' : 'div'
  }\`\``
}
