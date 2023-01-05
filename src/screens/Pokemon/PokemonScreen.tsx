import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import PageContainer from '../../components/PageContainer/PageContainer';
import usePokemonList from './hooks/usePokemonList';

const PokemonScreen: FC = () => {
  const { data: { pokemon }, action: { setUrl } } = usePokemonList();

  return <PageContainer hasSafeArea={true}>
    <FlatList
      data={pokemon?.results}
      renderItem={({ item }) => {
        return <List.Accordion
          title={item.name}>

        </List.Accordion>
      }}
    />
  </PageContainer>;
};

export default PokemonScreen;