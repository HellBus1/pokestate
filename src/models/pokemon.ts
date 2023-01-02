interface PaginatedResult<T> {
  count: number;
  next: string;
  prev: string;
  results: T[]
}

interface Pokemon {
  name: string;
  url: string;
}

export { PaginatedResult, Pokemon };
