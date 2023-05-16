import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('my-component-generation', () => {
  it('works', async () => {

    const runner = new SchematicTestRunner('schematics', collectionPath);
    const appOptions: any = { 
      name: 'schematest'
    };

    await runner.runSchematic('my-component-generation', appOptions, Tree.empty());

    console.log('from test')

    // expect(tree.files).toEqual([]);
  });
});
