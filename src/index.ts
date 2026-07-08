import {
  Match as M,
  Array as A,
  Function as F,
  pipe,
  RegExp as RX,
  flow,
  Predicate as PRED,
} from 'effect';

const ROOT_RIGHT_SYMBOL = '*';

type Arg = string | string[] | undefined;

const checkRights = (requires: string[]): ((right: string) => boolean) =>
  flow(
    RX.escape,
    (rx) => new RegExp('^' + rx + '(\\.[a-zA-Z0-9_\\-\\.]*)*$'),
    (rx) => A.some(requires, (el) => rx.test(el))
  );

export const isAllowed = (has: Arg, requires: Arg): boolean =>
  pipe(
    M.type<{
      has: Arg;
      requires: Arg;
    }>(),
    M.whenOr(
      { requires: undefined },
      { requires: [] },
      { requires: [''] },
      { requires: '' },
      F.constTrue
    ),
    M.whenOr(
      { has: undefined },
      { has: A.some(PRED.isNullable) },
      F.constFalse
    ),
    M.whenAnd(
      { has: M.defined, requires: M.defined },
      {
        has: (el: string | string[]) =>
          pipe(el, A.ensure, A.contains(ROOT_RIGHT_SYMBOL)),
      },
      F.constTrue
    ),
    M.when({ has: M.defined, requires: M.defined }, ({ has, requires }) =>
      A.some(A.ensure(has), checkRights(A.ensure(requires)))
    ),
    M.orElse(F.constFalse)
  )({ has, requires });
