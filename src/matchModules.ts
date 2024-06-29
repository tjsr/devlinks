import { includeModule, isLinkedModule } from "./checks.js";

export type CheckedModule = { resolved: string|undefined };

export const getMatchedModules = (
  modules: object,
  patterns: string[]|undefined,
  owners: string[]|undefined,
  _exclude: string|undefined
): string[] => {
  const matchedLinkedModules: string[] = Array.from(Object.keys(modules))
    .filter((key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const module: CheckedModule = (modules as Record<string, any>)[key] as CheckedModule;

      return isLinkedModule(module) &&
        includeModule(key, owners, patterns);
    });

  return matchedLinkedModules;
};
