import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './doctor.reducer';

export const DoctorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const doctorEntity = useAppSelector(state => state.doctor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="doctorDetailsHeading">Doctor</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{doctorEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{doctorEntity.name}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{doctorEntity.email}</dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{doctorEntity.phoneNumber}</dd>
          <dt>
            <span id="hireDate">Hire Date</span>
          </dt>
          <dd>{doctorEntity.hireDate ? <TextFormat value={doctorEntity.hireDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="license">License</span>
          </dt>
          <dd>{doctorEntity.license}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {doctorEntity.image ? (
              <div>
                {doctorEntity.imageContentType ? (
                  <a onClick={openFile(doctorEntity.imageContentType, doctorEntity.image)}>
                    <img src={`data:${doctorEntity.imageContentType};base64,${doctorEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {doctorEntity.imageContentType}, {byteSize(doctorEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Place</dt>
          <dd>
            {doctorEntity.places
              ? doctorEntity.places.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {doctorEntity.places && i === doctorEntity.places.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Specialty</dt>
          <dd>
            {doctorEntity.specialties
              ? doctorEntity.specialties.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {doctorEntity.specialties && i === doctorEntity.specialties.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/doctor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/doctor/${doctorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DoctorDetail;
