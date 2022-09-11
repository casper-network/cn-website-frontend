import { BaseFactory } from '@/factories/baseFactory';

// eslint-disable-next-line import/prefer-default-export
export class StaticFactory extends BaseFactory {
  // eslint-disable-next-line no-useless-constructor
  constructor(context, filenameReplacementPattern) {
    super(
      context,
      filenameReplacementPattern,
    );
  }

  static register(vue, context, filenameReplacementPattern) {
    const factory = new this(context, filenameReplacementPattern);

    factory.requireComponent.keys().forEach((contextFilename) => {
      const { componentName, component } = factory.fetchComponent(contextFilename);
      vue.component(componentName, component.default || component);
    });
  }
}
