import { Framework } from "../../../types/configuration";

export const REACT_IMPORT = "import React from 'react'";

export const REACT_IMPORT_WAP = "import React, { FC } from 'react'";

export const STYLED_COMPONENT = "const StyledContainer = styled.div``";

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
  return `interface ${componentName}Props {}`;
};
