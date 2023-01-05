import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import PageContainer from '../../components/PageContainer/PageContainer';
import usePokemonList from './hooks/usePokemonList';

const PokemonScreen: FC = () => {
  const { data: { pokemon, page }, action: { setPage } } = usePokemonList();

  return <PageContainer hasSafeArea={true}>
    <FlatList
      data={pokemon?.results}
      renderItem={({ item }) => {
        return <List.Accordion
          title={item.name}>
        </List.Accordion>
      }}
      onEndReached={() => setPage(page + 1)}
    />
  </PageContainer>;
};

export default PokemonScreen;