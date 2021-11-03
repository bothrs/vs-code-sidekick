import { Uri } from "vscode";
import { Framework } from "../../types/configuration";
import { createFileWithContents } from "./utils/fs";
import {
  generatePropsInterface,
  generateStyledComponentsImport,
  REACT_IMPORT_WAP,
  STYLED_COMPONENT,
} from "./utils/snippets";

const createReactOrReactNativeComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework.React | Framework.ReactNative
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  );

  await createFileWithContents(
    componentUri,
    `${REACT_IMPORT_WAP}\n` +
      `${generateStyledComponentsImport(framework)}\n\n` +
      `${STYLED_COMPONENT}\n\n` +
      `${generatePropsInterface(componentName)}\n\n` +
      `const ${componentName}: FC<${componentName}Props> = ({ children }) => {\n` +
      `  return <StyledContainer>{children}</StyledContainer>\n` +
      `}\n\n` +
      `export default ${componentName}\n`
  );

  return componentUri;
};

export const createWapComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework
): Promise<Uri | void> => {
  if (framework === Framework.React || framework === Framework.ReactNative) {
    return createReactOrReactNativeComponent(
      componentDirectoryPath,
      componentName,
      framework
    );
  }
};
