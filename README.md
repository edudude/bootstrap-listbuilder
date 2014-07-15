[![Build Status](http://img.shields.io/travis/linn/bootstrap-listbuilder/master.svg?style=flat)](https://travis-ci.org/linn/bootstrap-listbuilder)
[![npm Version](http://img.shields.io/npm/v/bootstrap-listbuilder.svg?style=flat)](https://www.npmjs.org/package/bootstrap-listbuilder)
[![Nuget Version](http://img.shields.io/nuget/v/bootstrap-listbuilder.svg?style=flat)](https://www.nuget.org/packages/bootstrap-listbuilder/)
bootstrap-listbuilder
=====================

Simple list builder component for Bootstrap.

## Installation
### [Bower](http://bower.io/search/?q=bootstrap-listbuilder)
```
bower install bootstrap-listbuilder
```

### [npm](https://www.npmjs.org/package/bootstrap-listbuilder) [![npm Version](http://img.shields.io/npm/v/bootstrap-listbuilder.svg?style=flat)](https://www.npmjs.org/package/bootstrap-listbuilder) [![npm Downloads](http://img.shields.io/npm/dm/bootstrap-listbuilder.svg?style=flat)](https://www.npmjs.org/package/bootstrap-listbuilder)
```
npm install bootstrap-listbuilder
```

### [NuGet](https://www.nuget.org/packages/bootstrap-listbuilder/) [![Nuget Version](http://img.shields.io/nuget/v/bootstrap-listbuilder.svg?style=flat)](https://www.nuget.org/packages/bootstrap-listbuilder/) [![Nuget Downloads](http://img.shields.io/nuget/dt/bootstrap-listbuilder.svg?style=flat)](https://www.nuget.org/packages/bootstrap-listbuilder/)

```
Install-Package bootstrap-listbuilder
```

## Publishing
Prior to publishing a new version of the package, you must run the following commands to configure your NuGet and npm credentials. You should only need to do this once.
```
npm adduser
grunt nugetkey --key=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```
Once you have entered your credentials, you can publish to npm and NuGet by running one of the following tasks:
 ```
grunt publish
```
Increments patch version in package.json, publishes to npm and NuGet. This is short-hand for `grunt publish:patch`.
```
grunt publish:minor
```
As before, but bumps minor version.
```
grunt publish:major
```
As before, but bumps major version.

The publish task will create an appropriate semver tag which Bower will detect as a new version.
