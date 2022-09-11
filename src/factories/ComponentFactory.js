import { StaticFactory } from '@/factories/StaticFactory';
import { LazyFactory } from '@/factories/LazyFactory';

// eslint-disable-next-line import/prefer-default-export
export const ComponentFactory = (Vue, options = {}) => {
  // eslint-disable-next-line no-throw-literal
  if (!options.context) throw 'ComponentFactory: Needs an instance of require.context.';

  const wantsAsync = options.context.id.split(' ')[1] === 'lazy';
  const factory = wantsAsync ? LazyFactory : StaticFactory;
  const { context, filenameReplacementPattern } = options;
  const defaultFileReplacementPattern = /.*\/(\w+).vue$/g;

  factory.register(Vue, context, filenameReplacementPattern || defaultFileReplacementPattern);
};
