import qs from 'qs';
import useSWR from 'swr';
import { PaginatedResult, Pokemon } from '../../../models/pokemon';
import { getPokemonList } from '../../../utils/fetcher';

const usePokemonList = (params: Record<string, any> | undefined = undefined) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const { data: pokemon, error } = useSWR<PaginatedResult<Pokemon>, Error>(
    `https://pokeapi.co/api/v2/pokemon?${query}`,
    () => getPokemonList(params),
  );

  return {
    data: { pokemon },
    error
  }
};

export default usePokemonList;