package com.delaiglesia.jhipsterbackend.repository;

import com.delaiglesia.jhipsterbackend.domain.Place;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Place entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {}
