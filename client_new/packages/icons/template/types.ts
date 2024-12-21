import { XMLBuilder, XMLParser } from 'fast-xml-parser';

export type ExportSettings = {
  assetsPath: string;
  componentsPath: string;
  fileType: string;
  template: HandlebarsTemplateDelegate<any>;
  xmlParser: XMLParser;
  xmlBuilder: XMLBuilder;
};

export type TemplateProps = {
  name: string;
  content: string;
};

export enum ComponentResult {
  Created,
  Skipped,
  Error,
}
