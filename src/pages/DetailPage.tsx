import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';
import PokemonInfo from '../components/PokemonInfo';
import Tabs from '../components/Tabs';
import useSpecies from '../hook/useSpecies';
import usePoketmon from '../hook/usePoketmon';
import { PokemonResponse } from '../types';
import About from '../components/About';
import Stats from '../components/Stats';
import Evolution from '../components/Evolution';
import { useNavigate } from 'react-router-dom';

type Params = {
  id: string;
};

type Tab = 'about' | 'stats' | 'evolution';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>('about');

  // 특정 포켓몬 정보
  const speciesResult = useSpecies(id as string);
  // console.log('특정 포켓몬 정보', speciesResult);
  const pokemonResult = usePoketmon<PokemonResponse>(id);
  // console.log('특정 포켓몬 이름', pokemonResult);

  const { name, types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      name: pokemonResult.data?.data.name,
      types: pokemonResult.data?.data.types,
      height: pokemonResult.data?.data.height,
      weight: pokemonResult.data?.data.weight,
      abilities: pokemonResult.data?.data.abilities,
      baseExp: pokemonResult.data?.data.base_experience,
      stats: pokemonResult.data?.data.stats,
    }),
    [pokemonResult]
  );

  const {
    color,
    growthRate,
    flavorText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      color: speciesResult.data?.data.color,
      growthRate: speciesResult.data?.data.growth_rate.name,
      flavorText: speciesResult.data?.data.flavor_text_entries[0].flavor_text,
      genderRate: speciesResult.data?.data.gender_rate,
      isLegendary: speciesResult.data?.data.is_legendary,
      isMythical: speciesResult.data?.data.is_mythical,
      evolutionChainUrl: speciesResult.data?.data.evolution_chain.url,
    }),
    [speciesResult]
  );

  const handleClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  const navigate = useNavigate();

  const gotoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <PokemonInfo id={id as string} name={name} types={types} color={color} />
      <TabsWrapper>
        <Tabs tab={selectedTab} onClick={handleClick} />
      </TabsWrapper>
      {/* selectTab이 about 일떄 */}
      {selectedTab === 'about' && (
        <About
          isLoading={pokemonResult.isLoading || speciesResult.isLoading}
          color={color}
          growthRate={growthRate}
          flavorText={flavorText}
          genderRate={genderRate}
          isLegendary={isLegendary}
          isMythical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilities={abilities}
        />
      )}
      <div onClick={gotoBack}>뒤로가기</div>
      

      {/* selectTab이 stats 일떄 */}
      {selectedTab === 'stats' && (
        <Stats
          isLoading={pokemonResult.isLoading || speciesResult.isLoading}
          color={color}
          stats={stats}
        />
      )}
      {/* selectTab이 evolution 일떄 */}
      {selectedTab === 'evolution' && (
        <Evolution
          id={id}
          isLoading={speciesResult.isLoading}
          color={color}
          url={evolutionChainUrl}
        />
      )}
    </Container>
  );
};

export default DetailPage;
