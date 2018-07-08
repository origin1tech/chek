# Changes

List of changes.

### 07.06.2018 (v1.2.3-v1.2.6)

Opted to just use Object.assign and poly instead of clone for get, set, del. The problem is lodash.clone does not support some objects. Cloning will return an empty object. Since get, set, del etc are typically used for simple objects and largely object literals decided to focus on that requirement over dealing with lodash.clone unsupported objects.

+ **object** favor assign instead of clone for get, set etc. lodash.clone can return empty.
+ **get** fixed issue where picking values in object returned undefined in some cases.
+ **clone** chek has one dep "clone" change from npm package clone to lodash.clone.
+ **keys** not sure how this even happened but was ignoring non plain objects.

### 06.15.2018 (v1.2.0-v1.2.2)

Immutable array methods should return object with both the resulting array and the value or length where applicable. This is a modest breaking change and hence why the minor version to 1.2.x

Deprecate IArrayResult interface instead imply return values rather than a return val of type any.

+ **pick** picks properties from an object.
+ **omit** omits values from string, arrays objects by property name.

### 06.14.2018 (v1.1.17-v1.1.18)

+ **decamelcase** converts a camelcase string to option/flag with dashes.
+ **toDefault** fix issue where "false" results in a null but should not.

### 06.07.2018 (v1.1.15)

+ **put** add "put" which uses set to ensure pushing values to an array without first doing a get.

### 05.23.2018 (v1.1.13)

+ **containsAny** whoops! had a console.log in there.
+ **comments** remove some unnecessary comments.
+ **packages** update packages.

### 05.19.2018 (v1.1.8-v.1.1.12)

+ **has** add method .has() to check if object has property path.
+ **get** fix bug where doesn't get nested arrays, allow setting default values.
+ **assign** convenience wrapper to Object.assign.
+ **contains** allow passing strings, add transform option.
+ **containsAny** allow passing strings, add transform option.
+ **includes** alias to contains
+ **includesAny** alias to containsAny.
+ **get** fix bug where default value is set when it shouldn't be.

### 05.16.2018 (v1.1.7)

+ **set** fix bug where arrays are not created if do not exist.

### 02.09.2018

+ **isDebug** add check for --inspect improve checking favor regex over indexOf check.

### 12.27.2017

+ **interfaces** export interfaces to better support custom functions/wrappers.

### 12.25.2017

+ **isRoot** add method to check if running sudo (Node ONLY).
+ **isDocker** add method to check if running within a docker containter (Node ONLY).

### 12.17.2017

+ **toArray** all default value as second argument.

### 12.3.2017

+ **orderBy** add method for sorting objects by propery names.
+ **toDate** allow passing Intl.DateFormatOptions to assigning date to locale/timezone.

### 10.18.2017

+ **toType** create alias toType() to castType() becasue I'm stupid and always want to type it.

### 10.7.2017

+ **.npmignore** ignore build & source folders.

### 9.23.2017

+ **isBuffer** add method to check if is buffer.
+ **isFile** add method to check if is file in file system (Node Only).
+ **isDirectory** add method to check if is directory in file sys (Node Only).

### 9.14.2017

+ **camelcase** fix issue where first char isn't lower in some cases.

### 9.5.2017

+ **toRegExp** fixed issue where RegExp options are not appended.
+ **isWindows** added method to indicate if node running in windows.

### 8.23.2017

+ **split** fix issue where custom chars are not honored.

### 8.20.2017

+ **toFloat** fixed issue where toNumber whole numbers were converted to binary by error.
+ **src/** .npmignore had source dir exlcuded add it back in.

### 8.19.2017

+ **split** added trim after split to trim whitespace (note removed "trim" option from v1.0.18, automatic now)
+ **tryRequire** create missing test for tryRequire "root" modules.

### 8.14.2017

+ **isInspect** added method to check if node started with --inspect or --inspect-brk flags.

### 8.13.2017

+ **split** iterate chars lookup in order instead of reverse to support first found char.

### 8.11.2017

+ **split** allowed specified char to accept array of values.

### 8.8.2017

+ **tryRootRequire** add new method to require root modules from sub modules.

### 8.4.2017

+ **noop** set noop to allow any args to prevent typescript from complaining.
+ **noopIf** set noop if function to type of any to prevent TypeScript design time error.

### 7.21.2017

+ **extend** fix issue where extend wasn't handling undefined values correctly.

### 7.15.2017

+ **toInteger** remove redundant check if isInteger, don't cast to string before tryWrap.
+ **castType** set the cast type in array to current or previous or first.
+ **tests** tests for integer and float when casting from array of values.
+ **keys** fix invalid typing for "keys".

## 7.14.2017

+ **isTruthy** method imporperly return false when should return true for some strings, tests updated.
+ **toWindow** added missing tests to get 100% coverage.
+ **CHANGE** added change log for documenting changes.