import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import path, { parse } from 'path';
import handlebars from 'handlebars';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { ComponentResult, ExportSettings, TemplateProps } from './types';
import { existsSync } from 'fs';

async function main() {
  const settings = await loadSettings();
  const files = await readdir(settings.assetsPath);

  const stats = {
    created: 0,
    skipped: 0,
    failed: 0,
  };

  for (const file of files) {
    try {
      const result = await generateComponent(settings, file);

      if (result === ComponentResult.Created) stats.created++;
      else stats.skipped++;
    } catch (err) {
      console.log(err);
      stats.failed++;
    }
  }

  console.log('Finished Generating Icons');
  console.log(`Created: ${stats.created}`);
  console.log(`Skipped: ${stats.skipped}`);
  console.log(`Failed: ${stats.failed}`);

  updateExports(settings);
  console.log('Finished updating index.ts');
}

async function generateComponent(
  settings: ExportSettings,
  file: string,
): Promise<ComponentResult> {
  const filePath = path.join(settings.assetsPath, file);
  const fileExtension = path.extname(filePath);
  if (fileExtension != settings.fileType) return ComponentResult.Error;

  const componentName = file
    .replace(/ /g, '')
    .replace('-', '')
    .replace(fileExtension, '');
  const componentPath = path.join(
    settings.componentsPath,
    componentName + '.tsx',
  );

  if (existsSync(componentPath)) {
    console.log(`${componentPath} already exists skipping creation.`);
    return ComponentResult.Skipped;
  }

  const svgFile = await readFile(filePath, 'utf8');
  const parsedXml = settings.xmlParser.parse(svgFile);
  const childXml = settings.xmlBuilder.build(parsedXml.svg);

  const props: TemplateProps = {
    name: componentName,
    content: childXml,
  };

  const component = settings.template(props);

  await writeFile(componentPath, component);

  console.log(`Created Icon ${componentPath}.`);
  return ComponentResult.Created;
}

async function loadSettings(): Promise<ExportSettings> {
  const templatePath = './template/icon.hbs';

  //XML Parser & Builder
  const xmlOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: '',
  };

  const templateString = await readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateString);
  const settings = {
    assetsPath: './assets',
    componentsPath: './src/components',
    fileType: '.svg',
    template,
    xmlParser: new XMLParser(xmlOptions),
    xmlBuilder: new XMLBuilder(xmlOptions),
  };

  if (!existsSync(settings.componentsPath)) {
    mkdir(settings.componentsPath);
  }

  return settings;
}

async function updateExports(settings: ExportSettings) {
  const files = await readdir(settings.componentsPath);

  const templatePath = './template/export.hbs';
  const templateString = await readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateString);
  const iconExports: string[] = [];
  for (const file of files) {
    const filePath = path.join(settings.componentsPath, file);
    const fileExtension = path.extname(filePath);
    if (fileExtension != '.tsx' || file == 'index.tsx') continue;

    const componentName = file.replace(/ /g, '').replace(fileExtension, '');
    const props = { name: componentName };
    const exportLine = template(props);
    iconExports.push(exportLine);
  }

  console.log(iconExports);
  await writeFile('src/index.ts', iconExports.join('\n'));
}

main().catch(console.error);
