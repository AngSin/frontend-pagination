import React, { useState, useEffect } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import './App.css';

const pageLimit = 10;

function App() {
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemon] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPokemon(index) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${index * pageLimit}&limit=${pageLimit}`)
      const { results, count } = await response.json();
      setPokemon(results);
      setTotal(count)
    }
    const pageIndex = page - 1;
    fetchPokemon(pageIndex);
  }, [page]);

  return (
    <>
      <Table celled inverted striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              Pokemon
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pokemonList.map(pokemon => (
            <Table.Row key={pokemon.name}>
              <Table.Cell>
                {pokemon.name}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        totalPages={Math.ceil(total/pageLimit)}
        onPageChange={(e, d) => setPage(d.activePage)}
        activePage={page}
      />
    </>
  );
}

export default App;
