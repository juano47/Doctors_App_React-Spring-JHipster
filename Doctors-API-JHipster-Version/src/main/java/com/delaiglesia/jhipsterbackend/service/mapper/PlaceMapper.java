package com.delaiglesia.jhipsterbackend.service.mapper;

import com.delaiglesia.jhipsterbackend.domain.Place;
import com.delaiglesia.jhipsterbackend.service.dto.PlaceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Place} and its DTO {@link PlaceDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlaceMapper extends EntityMapper<PlaceDTO, Place> {}
