# access.js

This littl' lib helps me to check if a user has access to something (aka. user-rights). I created this lib to make my life a bit easier when working with user and rights.

Probably this is not useful for anybody else, but how knows?

## user-rights? ##

If you have an application with users they probably have different access levels oder rights, right? I prefer a hierarchic user-level approach. Every user-right is a string with 0..n 'dots'. Every dot in the string represents a hierarchy level. The more dots, the lower is the right in the hierarchy.

A user is granted access to a resource, if he has the exact required right or any other higher hierarchy right.

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
`userA` has access to `resourceA`, because she has exactly matching right (`some`) that is required for the resource.
She can access `resourceB`, because she has a right that is higher in the hierarchy than the right that is required to access the resource (has: `foo.bar`, required: `foo.bar.wat`)
`userA` cannot access `resourceC`, because she only has a right that is lower in the hierarchy than the right the resource requires.


`userB` can only access `resourceC`. I think you now know why, right?
