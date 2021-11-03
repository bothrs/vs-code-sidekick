import { workspace, Uri } from "vscode";
import { Framework } from "../../types/configuration";
import {
  generatePropsFileImport,
  generatePropsInterface,
  generateStyledComponentsImport,
  generateStyledFileImport,
  REACT_IMPORT,
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

  await createFileWithContents(
    componentUri,
    `${REACT_IMPORT}\n\n` +
      `${generateStyledFileImport(componentName)}\n` +
      `${generatePropsFileImport(componentName)}\n\n` +
      `export const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {\n` +
      `\treturn <StyledContainer>{children}</StyledContainer>\n` +
      `}\n`
  );

  await createFileWithContents(
    styledComponentsUri,
    `${generateStyledComponentsImport(framework)}\n\n` +
      `export const StyledContainer = styled.div\`\`\n`
  );

  await createFileWithContents(
    componentPropsUri,
    `${generatePropsInterface(componentName)}\n`
  );
};

export const createAmbientComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework
) => {
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
