import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';
import {Schema as ApplicationOptions, Style} from '@schematics/angular/application/schema';
const collectionPath = path.join(__dirname, '../collection.json');

describe('my-component-generation', async () => {
    const testRunner = new SchematicTestRunner(
      'schematics', collectionPath);

    const workspaceOptions: WorkspaceOptions = {
      name: 'workspace',
      newProjectRoot: 'projects',
      version: '6.0.0',
    };

    describe('', () => {
      const appOptions: ApplicationOptions = {
        name: 'bar',
        inlineStyle: false,
        inlineTemplate: false,
        routing: false,
        style: Style.Css,
        skipTests: false,
        skipPackageJson: false,
      };

      let appTree: UnitTestTree;

      beforeEach(async () => {
          appTree = await testRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
          appTree = await testRunner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
      });

      it('fails with missing tree', async () => {
        console.log('from test')

        const tree = await testRunner.runSchematic('my-component-generation', {
          name: 'test-name'
        }, Tree.empty())

        console.log('tree', tree)
    });
    })
});
