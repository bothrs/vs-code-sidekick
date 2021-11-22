import type { Uri } from 'vscode';
import { Framework, ProductTeam } from '../../types/configuration';
import { createAmbientComponent } from './createAmbientComponent';
import { createFunctionalComponent } from './createFunctionalComponent';

export const createComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework,
  productTeam: ProductTeam
): Promise<Uri | void> => {
  const sanitizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  if (productTeam === ProductTeam.Ambient) {
    return await createAmbientComponent(
      commandPath,
      sanitizedComponentName,
      framework
    );
  } else if (productTeam === ProductTeam.Commerce) {
    return await createAmbientComponent(
      commandPath,
      sanitizedComponentName,
      framework
    );
  }

  return await createFunctionalComponent(
    commandPath,
    sanitizedComponentName,
    framework
  );
};
