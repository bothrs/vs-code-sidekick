import { Uri } from 'vscode';
import { Framework } from '../../types/configuration';
import { createFileWithContents } from './utils/fs';
import {
  generatePropsInterface,
  generateStyledComponent,
  generateStyledComponentsImport,
  REACT_IMPORT_FC,
  REACT_NATIVE_IMPORT,
} from './utils/snippets';

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
    `${REACT_IMPORT_FC}\n` +
      `${REACT_NATIVE_IMPORT}\n` +
      `${generateStyledComponentsImport(framework)}\n\n` +
      `${generatePropsInterface()}\n\n` +
      `const ${componentName}: FC<Props> = ({ children, style }) => {\n` +
      `  return <Container style={style}>{children}</Container>\n` +
      `}\n\n` +
      `export default ${componentName}\n` +
      `${generateStyledComponent(framework)}\n\n`
  );

  return componentUri;
};

export const createFunctionalComponent = async (
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
