import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import {
  buildDefaultPath,
  getWorkspace,
} from '@schematics/angular/utility/workspace';
import { parseName } from '../utility/parse-name';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myComponentGeneration(_options: any): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(_tree);
    const projectName = _options.project || Object.keys(workspace.projects)[0];
    const project = workspace.projects.get(_options.project as string);
    const path = _options.path || buildDefaultPath(project as any);
    const parsedPath = parseName(path, _options.name);

    _options.name = parsedPath.name;
    _options.path = parsedPath.path;

    console.log('workspace project', Object.keys(workspace.projects)[0])
    console.log('projectName', projectName)
    console.log('project', project)
    console.log('path', path)
    console.log('parsedPath', parsedPath)

    const templateSource = apply(
        url('./files/src'), [
            template({
                ..._options,
                ...strings
            }),
            move(parsedPath.path)
        ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', _options),
        mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
};
}
