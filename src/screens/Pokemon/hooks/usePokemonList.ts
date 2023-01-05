import { useState } from 'react';
import useSWR from 'swr';
import { PaginatedResult, Pokemon } from '../../../models/pokemon';
import { getPokemonList } from '../../../utils/fetcher';

const usePokemonList = () => {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=10');

  const { data: pokemon, error } = useSWR<PaginatedResult<Pokemon>, Error>(
    url,
    () => getPokemonList(url),
  );

  return {
    data: { pokemon },
    action: { setUrl },
    error
  }
};

export default usePokemonList;