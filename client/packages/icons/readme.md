## Generate SVG Component

You can use npm run generate-icons to generate react components for all icons with built in support for width, height and class names. Its possible that some icons will have broken classNames, width, height etc if this happens they will have to be fixed whenever they are first used.

Hot realoding currently doesn't work with this library when editing a tsx file you need to either restart the application or go into index.ts or types.ts and make a change (a line break is enough).
