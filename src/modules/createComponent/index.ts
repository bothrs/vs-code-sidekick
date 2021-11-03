import { Framework, ProductTeam } from "../../types/configuration";
import { createAmbientComponent } from "./createAmbientComponent";
import { createWapComponent } from "./createWapComponent";

export const createComponent = (
  commandPath: string,
  componentName: string,
  framework: Framework,
  productTeam: ProductTeam
) => {
  const sanitizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  if (productTeam === ProductTeam.Ambient) {
    return createAmbientComponent(
      commandPath,
      sanitizedComponentName,
      framework
    );
  } else if (productTeam === ProductTeam.Commerce) {
    return createAmbientComponent(
      commandPath,
      sanitizedComponentName,
      framework
    );
  } else if (productTeam === ProductTeam.WAP) {
    return createWapComponent(commandPath, sanitizedComponentName, framework);
  }
};
