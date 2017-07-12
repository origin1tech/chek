
import * as arr from './modules/array';
import * as frm from './modules/from';
import * as func from './modules/function';
import * as is from './modules/is';
import * as obj from './modules/object';
import * as str from './modules/string';
import * as to from './modules/to';
import * as typ from './modules/type';

// Add Chek to window when
// process.env.BROWSER is true.
/* istanbul ignore if */
if (is.isBrowser('BROWSER')) {
  to.toWindow(arr);
  to.toWindow(frm);
  to.toWindow(func);
  to.toWindow(is);
  to.toWindow(obj);
  to.toWindow(str);
  to.toWindow(to);
  to.toWindow('tryWrap', func.tryWrap);
  to.toWindow(typ);
}

export * from './modules/array';
export * from './modules/constant';
export * from './modules/from';
export * from './modules/function';
export * from './modules/is';
export * from './modules/object';
export * from './modules/string';
export * from './modules/to';
export * from './modules/type';
