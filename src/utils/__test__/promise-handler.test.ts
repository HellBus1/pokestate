import axios from 'axios';
import { getPokemonList } from '../fetcher';

jest.mock('axios');

/**
 * Testing {@function getPokemonList}
 * from {@file fetcher.ts}
*/
describe('getPokemonList', () => {
  it('should return data when the API call is successful', async () => {
    const data = {
      count: 1,
      results: [{ name: 'Pikachu' }],
    };
    (axios.get as jest.Mock).mockResolvedValue({ data });

    const result = await getPokemonList('http://example.com');
    expect(result).toEqual(data);
  });

  it('should throw an error when the API call fails', async () => {
    const error = { detail: 'Something happened while setting up the request' };
    (axios.get as jest.Mock).mockRejectedValue({ response: { data: error } });

    try {
      await getPokemonList('http://example.com');
    } catch (err) {
      if (err instanceof Error) expect(err.message).toEqual(error.detail.toString());
    }
  });

  it('should throw an error when data is not returned', async () => {
    (axios.get as jest.Mock).mockResolvedValue({});

    try {
      await getPokemonList('http://example.com');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});