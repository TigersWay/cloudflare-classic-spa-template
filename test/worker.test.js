import { exports } from 'cloudflare:workers';
import { describe, it, expect } from 'vitest';

import { randomString } from './utils.js';

describe('Worker', () => {
  it('Responds with "Hello World!"', async () => {
    const response = await exports.default.fetch('http://example.com/worker/hello');
    // expect(await response.json()).toMatchInlineSnapshot(`"Hello World!"`);
    expect(await response.json()).toStrictEqual('Hello World!');
  });

  it('Anything else with 404/Not Found', async () => {
    const route = randomString(10);
    const response = await exports.default.fetch(`http://example.com/${route}`);
    expect(response.status).toBe(404);
    expect(await response.json()).toStrictEqual({ status: 404, error: 'Not Found' });
  });
});
