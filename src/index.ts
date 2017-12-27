import * as chek from './chek';

/* istanbul ignore if */
chek.toWindow('chek', chek, ['tryRequire', 'isNode']);

export * from './interfaces';
export * from './chek';
