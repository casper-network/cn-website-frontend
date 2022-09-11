// eslint-disable-next-line import/prefer-default-export
export class BaseFactory {
  constructor(requireContext, filenameReplacementPattern) {
    this.requireComponent = requireContext;
    this.filenameReplacementPattern = filenameReplacementPattern;
  }

  fetchComponent(contextFilename) {
    const component = this.requireComponent(contextFilename);
    const filename = contextFilename.replace(this.filenameReplacementPattern, '$1');
    const componentName = component.name || filename;

    return {
      componentName,
      component,
      filename,
    };
  }
}
