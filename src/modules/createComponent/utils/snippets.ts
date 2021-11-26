import { Framework } from '../../../types/configuration'

export const REACT_IMPORT =
  `import React from 'react'\n` + `import type { FC } from 'react'`

export const REACT_NATIVE_IMPORT =
  "import type { StyleProp, ViewStyle } from 'react-native'"

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

export const generatePropsInterface = (
  framework: Framework.React | Framework.ReactNative
) => {
  return (
    `interface Props {\n` +
    `  ${
      framework === Framework.ReactNative
        ? 'style?: StyleProp<ViewStyle>'
        : 'className?: string'
    }\n` +
    `}`
  )
}

export const generateStyledComponent = (
  framework: Framework.React | Framework.ReactNative
) => {
  return `const Container = styled.${
    framework === Framework.ReactNative ? 'View' : 'div'
  }\`\``
}
