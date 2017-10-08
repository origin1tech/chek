# Changes

List of changes.

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