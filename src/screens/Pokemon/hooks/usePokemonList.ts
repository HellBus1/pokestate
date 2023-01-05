import { useState } from 'react';
import useSWR from 'swr';
import { PaginatedResult, Pokemon } from '../../../models/pokemon';
import { getPokemonList } from '../../../utils/fetcher';

const usePokemonList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}&search=${search}`;

  const { data: pokemon, error } = useSWR<PaginatedResult<Pokemon>, Error>(
    url,
    () => getPokemonList(url),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: { pokemon, search, page },
    action: { setPage, setSearch },
    error
  }
};

export default usePokemonList;