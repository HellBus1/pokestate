import axios from "axios";
import { getPokemonList } from "../fetcher";

const { Cancel, AxiosError } = require('axios');
const { resolvePromise } = require('../promise-handler');

/**
 * Testing {@function resolvePromise}
 * from {@file promise-handler.ts}
*/
describe('Ensuring resolvePromise returning [data, null] resolved or [data, error] when rejected', () => {
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
    const promise = Promise.reject(new Cancel('test cancel error'));
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, {
      code: 500,
      detail: 'The request was canceled'
    }]);
  });

  test('Check whether if rejection is error with response', async () => {
    const axiosError = new AxiosError('test axios error', 400, null, null, {
      status: 400,
      statusText: 'Bad Request'
    });

    const promise = Promise.reject(axiosError);
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, { code: 400, detail: 'Bad Request' }]);
  });

  test('Check whether if rejection without response', async () => {
    const axiosError = new AxiosError('test axios error', 400, null, {}, null);

    const promise = Promise.reject(axiosError);
    const result = await resolvePromise(promise);

    expect(result).toEqual([null, { code: 500, detail: 'The request was made but no response was received' }]);
  });
});

/**
 * Testing {@function getPokemonList}
 * from {@file fetcher.ts}
*/
describe('Ensuring getPokemonList', () => {
  test('Check if resolved returning list of Pokemon', async () => {
    const data = {
      count: 807,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
      ]
    };

    const mockAxiosGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data }));
    const result = await getPokemonList();

    expect(result).toEqual(data);
    mockAxiosGet.mockRestore();
  });

  test('Check if rejected throwing Error', async () => {
    const error = { code: 404, detail: 'Not Found' };
    const mockAxiosGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));

    expect(getPokemonList()).rejects.toThrowError(error.detail);
    mockAxiosGet.mockRestore();
  });
});