import axios from 'axios';
import { resolvePromise } from '../promise-handler';

/**
 * Testing {@function resolvePromise}
 * from {@file promise-handler.ts}
*/
describe('resolvePromise', () => {
  test('Check whether is resolved', async () => {
    const promise = Promise.resolve({ data: 'test data' });
    const result = await resolvePromise(promise);

    expect(result).toEqual(['test data', null]);
  });

  test('Check whether if default rejection', async () => {
    const promise = Promise.reject(new Error('test default error'));
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, {
      code: 500,
      detail: 'Something happened while setting up the request'
    }]);
  });

  test('Check whether if rejection caused by cancelation', async () => {
    const promise = Promise.reject(new axios.Cancel('test cancel error'));
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, {
      code: 500,
      detail: 'The request was canceled'
    }]);
  });

  test('Check whether if rejection is error with response', async () => {
    const axiosError = new axios.AxiosError('test axios error', '400', undefined, null, {
      config: {},
      data: {},
      headers: {},
      status: 400,
      statusText: 'Bad Request'
    });

    const promise = Promise.reject(axiosError);
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, { code: 400, detail: 'Bad Request' }]);
  });

  test('Check whether if rejection without response', async () => {
    const axiosError = new axios.AxiosError('test axios error', '400', undefined, {}, undefined);

    const promise = Promise.reject(axiosError);
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, { code: 500, detail: 'The request was made but no response was received' }]);
  });
});