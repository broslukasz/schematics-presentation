import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { join, normalize } from 'path';
import { getWorkspace } from '@schematics/angular/utility/workspace'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myComponentGeneration(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    console.log('from schematic');
    await setupOptions(tree, _options);

    const movePath = normalize(_options.path + '/');

    // This is our Template source
    const templateSource = apply(
      url('./files/src'),
        // Array of rules
      [
        template({..._options}),

        // Move into the proper destination
        move(movePath)
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

  options.path = join(normalize(project.root), 'src');
  return host;
}
