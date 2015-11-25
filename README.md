# access-right

[![Build Status](https://img.shields.io/travis/ds82/access-right.svg?style=flat)](https://travis-ci.org/ds82/access-right) [![npm version](https://img.shields.io/npm/v/access-right.svg?style=flat)](https://www.npmjs.com/package/access-right)

This tiny library helps you to check if a user has access to somethin (e.g. a resource) in your node app.
I created this lib to make my life a bit easier, when working with user and rights.

Probably this is not useful for anybody else, but who knows?

## user-rights? ##

If you have an application with users they probably have different access levels oder rights.
I prefer a hierarchic user-level approach. Every user-right is a string with 0..n 'dots'.
Every dot in the string represents a hierarchy level. The more dots, the lower is the right in the hierarchy
(similiar to how domain and subdomains and sub-subdomains [...] work).

A user is granted access to a resource if one of these conditions is true:

* the user has exactly the correct access right (required right is equal to provided right)
* the user has a right that is higher in the hierarchy than the required right

## WAT? ##

Let's look at an example:

`userA` has the following rights: `['some', 'foo.bar']`
`userB` has the following rights: `['other', 'foo.bar.wat']`

Assume we have the following resources:

`resourceA` which requires: `['some']`
`resourceB` which requires: `['foo.bar.wat']`
`resourceC` which requires: `['foo']`

*Who can access what?*

`userA` can access `resourceA` and `resourceB`, but **not** `resourceC`
`userA` has access to `resourceA`, because she has the exactly matching right (`some`) that is required to access the resource.
She can access `resourceB`, because she has a right that is higher in the hierarchy than the right that is required to access the resource (has: `foo.bar`, required: `foo.bar.wat`)
`userA` cannot access `resourceC`, because she only has a right that is lower in the hierarchy than the right the resource requires.


`userB` can only access `resourceB` (because the required right `foo.bar.wat` matches exactly one of the provided rights) 

# tests

There are some basic unit tests. Run them with npm:

```
npm install
npm test
```
