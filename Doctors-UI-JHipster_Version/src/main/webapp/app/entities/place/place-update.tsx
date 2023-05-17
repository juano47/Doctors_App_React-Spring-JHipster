import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDoctor } from 'app/shared/model/doctor.model';
import { getEntities as getDoctors } from 'app/entities/doctor/doctor.reducer';
import { IPlace } from 'app/shared/model/place.model';
import { getEntity, updateEntity, createEntity, reset } from './place.reducer';

export const PlaceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const doctors = useAppSelector(state => state.doctor.entities);
  const placeEntity = useAppSelector(state => state.place.entity);
  const loading = useAppSelector(state => state.place.loading);
  const updating = useAppSelector(state => state.place.updating);
  const updateSuccess = useAppSelector(state => state.place.updateSuccess);

  const handleClose = () => {
    navigate('/place');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getDoctors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...placeEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...placeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jHipsterFrontendApp.place.home.createOrEditLabel" data-cy="PlaceCreateUpdateHeading">
            Create or edit a Place
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="place-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Street Address" id="place-streetAddress" name="streetAddress" data-cy="streetAddress" type="text" />
              <ValidatedField label="Postal Code" id="place-postalCode" name="postalCode" data-cy="postalCode" type="text" />
              <ValidatedField label="City" id="place-city" name="city" data-cy="city" type="text" />
              <ValidatedField label="State Province" id="place-stateProvince" name="stateProvince" data-cy="stateProvince" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/place" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PlaceUpdate;
