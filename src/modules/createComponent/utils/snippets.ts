import { Framework } from "../../../types/configuration";

export const REACT_IMPORT = "import React from 'react'";

export const generateStyledComponentsImport = (
  framework: Framework.React | Framework.ReactNative
) => {
  return `import styled from 'styled-components${
    framework === Framework.ReactNative ? "/native" : ""
  }'`;
};

export const generateStyledFileImport = (componentName: string) => {
  return `import { StyledContainer } from './${componentName}.styled'`;
};

export const generatePropsFileImport = (componentName: string) => {
  return `import type { ${componentName}Props } from './${componentName}.props'`;
};

export const generatePropsInterface = (componentName: string) => {
  return `export interface ${componentName}Props {}`;
};
