import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './specialty.reducer';

export const SpecialtyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const specialtyEntity = useAppSelector(state => state.specialty.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="specialtyDetailsHeading">Specialty</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{specialtyEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{specialtyEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{specialtyEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/specialty" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/specialty/${specialtyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SpecialtyDetail;
