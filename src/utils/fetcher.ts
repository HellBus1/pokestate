import axios from "axios";
import { PaginatedResult, Pokemon } from "../models/pokemon";
import { resolvePromise } from "./promise-handler";

const getPokemonList = async (): Promise<PaginatedResult<Pokemon>> => {
  const [data, error] = await resolvePromise<PaginatedResult<Pokemon>>(
    axios.get('https://pokeapi.co/api/v2/pokemon/')
  );

  if (error) throw Error(error.detail.toString());
  if (data) return data
  throw Error()
}

export { getPokemonList };
