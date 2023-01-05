import axios from "axios";
import { PaginatedResult, Pokemon } from "../models/pokemon";
import { resolvePromise } from "./promise-handler";

const getPokemonList = async (url: string): Promise<PaginatedResult<Pokemon>> => {
  const [data, error] = await resolvePromise<PaginatedResult<Pokemon>>(
    axios.get(url)
  );

  if (error) throw Error(error.detail.toString());
  if (data) return data
  throw Error('Server Error')
}

export { getPokemonList };
