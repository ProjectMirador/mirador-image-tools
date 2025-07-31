# mirador-image-tools

![Node.js CI](https://github.com/ProjectMirador/mirador-image-tools/workflows/Node.js%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/mirador-image-tools.svg)](https://badge.fury.io/js/mirador-image-tools)


`mirador-image-tools` is a [Mirador](https://github.com/projectmirador/mirador) plugin that adds image manipulation tools to the user interface.

![Mirador image tools example](https://user-images.githubusercontent.com/1656824/88096343-b81f3b00-cb53-11ea-9b25-2536741a2824.png)

## Configuration
Several configuration options are available on windows that use mirador-image-tools.


Configuration | type | default | description
--- | --- | --- | ---
`imageToolsEnabled` | boolean | false | Enable the plugin to be shown
`imageToolsOpen` | boolean | false | Open the image tools by default

Example configuration:

```javascript
const config = {
  id: 'demo',
  windows: [{
    imageToolsEnabled: true,
    manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
  }]
};
```
## Installing `mirador-image-tools`

`mirador-image-tools` requires an instance of Mirador. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [live demo's index.js](https://github.com/ProjectMirador/mirador-image-tools/blob/main/demo/src/index.js) for an example of importing the `mirador-image-tools` plugin and configuring the adapter.

## Contribute
Mirador's development, design, and maintenance is driven by community needs and ongoing feedback and discussion. Join us at our regularly scheduled community calls, on [IIIF slack #mirador](http://bit.ly/iiif-slack), or the [mirador-tech](https://groups.google.com/forum/#!forum/mirador-tech) and [iiif-discuss](https://groups.google.com/forum/#!forum/iiif-discuss) mailing lists. To suggest features, report bugs, and clarify usage, please submit a GitHub issue.
