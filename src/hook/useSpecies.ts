// 포켓몬 아이디를 받아서 정보를 보내주는 훅
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { SpeciesResponse } from '../types';

const speciesApi = (id: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

const useSpecies = (id: string) =>
  useQuery<AxiosResponse<SpeciesResponse>, Error>(['species', { id }], () =>
    speciesApi(id)
  );

export default useSpecies;
