import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container';
import {
  StateContainer,
  State,
  Header,
  Owner,
  Loading,
  Title,
  IssueList,
  Label,
  Pagination,
} from './styles';

const states = ['all', 'open', 'closed'];

function Repository({ match }) {
  const repoName = useMemo(() => decodeURIComponent(match.params.repository));

  const [page, setPage] = useState(1);
  const [state, setState] = useState('open');
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repository, setRepository] = useState({});

  function handleError(error) {
    alert(error.message);
  }

  async function loadRepository() {
    try {
      const response = await api.get(`/repos/${repoName}`);

      setRepository(response.data);
    } catch (error) {
      handleError(error);
    }

    setLoading(false);
  }

  async function loadIssues() {
    try {
      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          page,
          state,
          per_page: 10,
        },
      });

      setIssues(response.data);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    loadRepository();
  }, []);

  useEffect(() => {
    loadIssues();
  }, [page, state]);

  function handleStateChange(newState) {
    setState(newState);
    setPage(1);
  }

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  return (
    <Container>
      <Owner
        href={`https://github.com/${repository.owner.login}`}
        target="blank"
      >
        <img src={repository.owner.avatar_url} alt={repository.owner.name} />
        {repository.owner.login}
      </Owner>
      <Header>
        <Link to="/">
          <FaArrowLeft />
        </Link>
      </Header>

      <Title>{repository.name}</Title>

      <StateContainer>
        {states.map(s => (
          <State key={s} checked={s === state}>
            <input
              type="radio"
              value={s}
              checked={s === state}
              onChange={() => handleStateChange(s)}
            />
            {s}
          </State>
        ))}
      </StateContainer>

      <IssueList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url} target="blank">
                  {issue.title}
                </a>
                {issue.labels.map(label => (
                  <Label key={String(label.id)} color={label.color}>
                    {label.name}
                  </Label>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>

      <Pagination>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <FaChevronLeft />
        </button>
        <span>{page}</span>
        <button type="button" onClick={() => setPage(page + 1)}>
          <FaChevronRight />
        </button>
      </Pagination>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
