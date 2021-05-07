import * as lgtm from '../src/lgtm';

describe('lgtm tests', () => {
  test('Extract image urls', async () => {
    const result = await lgtm.extractUrls();
    expect(result.length).toBeGreaterThan(0);

    const regex = new RegExp('^https://image.lgtmoon.dev/*');
    expect(result.filter((x) => regex.test(x)).length).toEqual(result.length);
  });
});
