import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButtom, List } from './styles';

import Container from '../../components/Container';

import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const repo = JSON.parse(localStorage.getItem('repositories'));
    if (repo) {
      setRepositories(repo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const checkIfExistRepo = repositories.find(
        ({ name }) => name === newRepo
      );

      if (checkIfExistRepo) {
        throw new Error(`"${newRepo}" exists!`);
      }

      const { data } = await api.get(`/repos/${newRepo}`);

      setRepositories([
        ...repositories,
        {
          id: data.id,
          name: data.full_name.toLowerCase(),
        },
      ]);

      setNewRepo('');
    } catch (error) {
      let msg;

      if (error.response) {
        msg = error.response.data.message;
      } else {
        msg = error.message;
      }

      alert(msg);
    }

    setLoading(false);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <SubmitButtom loading={loading}>
          {loading ? <FaSpinner /> : <FaPlus />}
        </SubmitButtom>
      </Form>

      <List>
        {repositories.map(repo => (
          <li key={String(repo.id)}>
            <span>{repo.name}</span>
            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
