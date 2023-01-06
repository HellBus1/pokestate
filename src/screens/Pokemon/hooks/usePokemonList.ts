import { useState } from 'react';
import useSWR from 'swr';
import { PaginatedResult, Pokemon } from '../../../models/pokemon';
import { getPokemonList } from '../../../utils/fetcher';

const usePokemonList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${page - 1}`;

  const { data: pokemon, error } = useSWR<PaginatedResult<Pokemon>, Error>(
    url,
    () => getPokemonList(url),
  );

  return {
    data: { pokemon },
    error
  }
};

export default usePokemonList;