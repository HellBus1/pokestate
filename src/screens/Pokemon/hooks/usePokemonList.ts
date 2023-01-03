import useSWR from 'swr';
import { PaginatedResult, Pokemon } from '../../../models/pokemon';
import { getPokemonList } from '../../../utils/fetcher';

const usePokemonList = () => {
  const { data: pokemon, error } = useSWR<PaginatedResult<Pokemon>, Error>(
    'https://pokeapi.co/api/v2/pokemon/',
    () => getPokemonList(),
  );

  return {
    data: { pokemon }
  }
};

export default usePokemonList;