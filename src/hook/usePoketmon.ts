import axios, { AxiosResponse } from 'axios';
import { useQueries, useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';

import { PokemonResponse } from '../types';

const pokemon = (id?: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ''}`, {
    params: { limit: 151 },
  });

// 포켓몬 불러오는 커스텀 훅
const usePokemon = <T>(
  id?: string
): UseQueryResult<AxiosResponse<T>, Error> => {
  // id가 있으면 ['pokemon', id] 배열 형태로 아니면 "pokemon" 문자열로
  return useQuery(id ? ['pokemon', id] : 'pokemon', () => pokemon(id));
};

export default usePokemon;
