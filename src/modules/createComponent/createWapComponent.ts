import type { Uri } from "vscode";
import { Framework } from "../../types/configuration";

export const createWapComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework
): Promise<Uri | void> => {};
