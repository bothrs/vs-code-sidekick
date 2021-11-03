import { workspace, Uri } from "vscode";
import { Framework } from "../../types/configuration";
import {
  generatePropsFileImport,
  generatePropsInterface,
  generateStyledComponentsImport,
  generateStyledFileImport,
  REACT_IMPORT,
  generateStyledComponent,
} from "./utils/snippets";
import { createFileWithContents } from "./utils/fs";

const createReactOrReactNativeComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework.React | Framework.ReactNative
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  );

  const styledComponentsUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.styled.tsx`
  );

  const componentPropsUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.props.tsx`
  );

  const barrelUri = Uri.file(`${componentDirectoryPath}/index.ts`);

  await createFileWithContents(
    componentUri,
    `${REACT_IMPORT}\n\n` +
      `${generatePropsFileImport(componentName)}\n` +
      `${generateStyledFileImport(componentName)}\n\n` +
      `export const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {\n` +
      `  return <StyledContainer>{children}</StyledContainer>\n` +
      `}\n`
  );

  await createFileWithContents(
    styledComponentsUri,
    `${generateStyledComponentsImport(framework)}\n\n` +
      `export ${generateStyledComponent(framework)}\n`
  );

  await createFileWithContents(
    componentPropsUri,
    `export ${generatePropsInterface(componentName)}\n`
  );

  await createFileWithContents(
    barrelUri,
    `export * from './${componentName}'\n` +
      `export * from './${componentName}.props'\n` +
      `export * from './${componentName}.styled'\n`
  );

  return componentUri;
};

export const createAmbientComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework
): Promise<Uri | void> => {
  const componentFolderName: string =
    componentName.charAt(0).toLowerCase() + componentName.slice(1);

  const componentFolderUri = Uri.file(`${commandPath}/${componentFolderName}`);

  await workspace.fs.createDirectory(componentFolderUri);

  if (framework === Framework.React || framework === Framework.ReactNative) {
    return createReactOrReactNativeComponent(
      componentFolderUri.path,
      componentName,
      framework
    );
  }
};
