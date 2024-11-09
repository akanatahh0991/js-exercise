import { createIssue, closeIssue, listIssue } from './index';
import fetch from 'node-fetch';
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import RestPersister from '@pollyjs/persister-rest';
import {jest} from '@jest/globals';

global.fetch = fetch;

describe('GitHub API with Jest mock functions', () => {
  const mockFetch = jest.spyOn(global, 'fetch');
  const accessToken = 'test_token';

  afterEach(() => {
    mockFetch.mockClear();
  });

  test('createIssue success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ number: 1, title: 'New Issue' }),
    });

    const result = await createIssue(
      'testOwner',
      'testRepo',
      accessToken,
      'New Issue',
      'Issue body',
      false
    );

    expect(result.ok).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/testOwner/testRepo/issues',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  test('closeIssue success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ number: 1, state: 'closed' }),
    });

    const result = await closeIssue(
      'testOwner',
      'testRepo',
      accessToken,
      1,
      false
    );

    expect(result.ok).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/testOwner/testRepo/issues/1',
      expect.objectContaining({
        method: 'PATCH',
      })
    );
  });

  test('listIssue success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ number: 1, title: 'New Issue' }],
    });

    const result = await listIssue('testOwner', 'testRepo', accessToken, false);

    expect(result.ok).toBe(true);
    expect(result.issues).toEqual([{ id: 1, title: 'New Issue' }]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/testOwner/testRepo/issues',
      expect.objectContaining({
        method: 'GET',
      })
    );
  });
});

// Polly.JSを使用したテスト
Polly.register(NodeHttpAdapter);
Polly.register(RestPersister);

describe('GitHub API with Polly.js', () => {
  let polly;
  const accessToken = 'test_token';

  beforeAll(() => {
    polly = new Polly('GitHub API', {
      adapters: ['node-http'],
      persister: 'rest',
      logging: true,
      recordIfMissing: true,
    });
  });

  afterAll(() => polly.stop());

  test('createIssue success', async () => {
    polly.server
      .post('https://api.github.com/repos/testOwner/testRepo/issues')
      .intercept((req, res) => {
        res.status(201).json({ number: 1, title: 'New Issue' });
      });

    const result = await createIssue(
      'testOwner',
      'testRepo',
      accessToken,
      'New Issue',
      'Issue body',
      false
    );

    expect(result.ok).toBe(true);
  });

  test('closeIssue success', async () => {
    polly.server
      .patch('https://api.github.com/repos/testOwner/testRepo/issues/1')
      .intercept((req, res) => {
        res.status(200).json({ number: 1, state: 'closed' });
      });

    const result = await closeIssue(
      'testOwner',
      'testRepo',
      accessToken,
      1,
      false
    );

    expect(result.ok).toBe(true);
  });

  test('listIssue success', async () => {
    polly.server
      .get('https://api.github.com/repos/testOwner/testRepo/issues')
      .intercept((req, res) => {
        res.status(200).json([{ number: 1, title: 'New Issue' }]);
      });

    const result = await listIssue('testOwner', 'testRepo', accessToken, false);

    expect(result.ok).toBe(true);
    expect(result.issues).toEqual([{ id: 1, title: 'New Issue' }]);
  });
});
