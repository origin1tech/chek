import * as chek from './chek';

/* istanbul ignore if */
if (chek.isBrowser())
  chek.toWindow('chek', chek, ['tryRequire', 'isNode']);

export * from './chek';
