import { isAllowed } from '../src/index';

describe('access', function() {
  describe('isAllowed()', function() {
    it.each`
      has                           | requires                                             | expected
      ${['some']}                   | ${''}                                                | ${true}
      ${['some']}                   | ${undefined}                                         | ${true}
      ${['*']}                      | ${'foo'}                                             | ${true}
      ${['x']}                      | ${['y', 'x']}                                        | ${true}
      ${['x']}                      | ${'x.y'}                                             | ${true}
      ${undefined}                  | ${undefined}                                         | ${true}
      ${[]}                         | ${undefined}                                         | ${true}
      ${['']}                       | ${'blah.blubb'}                                      | ${false}
      ${undefined}                  | ${'blah.blubb'}                                      | ${false}
      ${[undefined]}                | ${'blah.blubb'}                                      | ${false}
      ${['filebrowser.local.read']} | ${'filebrowser.local.read.jobs.a1.job'}              | ${true}
      ${['filebrowser.local.read']} | ${'filebrowser.local.read.jetflash_transcend_8gb_1'} | ${true}
      ${['filebrowser.local.read']} | ${'filebrowser.local.read.demo-test'}                | ${true}
      ${['a.b']}                    | ${['a.a', 'a.b']}                                    | ${true}
    `(
      'should return $expected for has $has and requires $requires',
      ({ has, requires, expected }) => {
        expect(isAllowed(has, requires)).toBe(expected);
      }
    );
  });
});
