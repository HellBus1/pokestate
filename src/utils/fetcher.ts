import axios from "axios";
import qs from "qs";
import { PaginatedResult, Pokemon } from "../models/pokemon";
import { resolvePromise } from "./promise-handler";

const getPokemonList = async (params: Record<string, any> | undefined = undefined): Promise<PaginatedResult<Pokemon>> => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<PaginatedResult<Pokemon>>(
    axios.get(`https://pokeapi.co/api/v2/pokemon?${query}`)
  );

  if (error) throw Error(error.detail.toString());
  if (data) return data
  throw Error()
}

export { getPokemonList };
