
import * as arr from './modules/array';
import * as coll from './modules/collection';
import * as frm from './modules/from';
import * as func from './modules/function';
import * as is from './modules/is';
import * as obj from './modules/object';
import * as str from './modules/string';
import * as to from './modules/to';
import * as tr from './modules/try';
import * as typ from './modules/type';

// Add Chek to window.
to.toWindow(arr);
to.toWindow(coll);
to.toWindow(frm);
to.toWindow(func);
to.toWindow(is);
to.toWindow(obj);
to.toWindow(str);
to.toWindow(to);
to.toWindow('tryWrap', tr.tryWrap);
to.toWindow(typ);

export * from './modules/array';
export * from './modules/collection';
export * from './modules/constant';
export * from './modules/from';
export * from './modules/function';
export * from './modules/is';
export * from './modules/object';
export * from './modules/string';
export * from './modules/to';
export * from './modules/try';
export * from './modules/type';
