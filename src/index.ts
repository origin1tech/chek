
/* Import all methods in case need to add to window */
import * as chek from './chek';

/* istanbul ignore if */
chek.toWindow('chek', chek, ['tryRequire', 'isNode']);

export * from './interfaces';
export * from './modules/array';
export * from './modules/constant';
export * from './modules/from';
export * from './modules/function';
export * from './modules/is';
export * from './modules/object';
export * from './modules/string';
export * from './modules/to';
export * from './modules/type';