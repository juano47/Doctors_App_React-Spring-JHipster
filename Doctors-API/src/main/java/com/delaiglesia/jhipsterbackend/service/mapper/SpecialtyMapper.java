package com.delaiglesia.jhipsterbackend.service.mapper;

import com.delaiglesia.jhipsterbackend.domain.Specialty;
import com.delaiglesia.jhipsterbackend.service.dto.SpecialtyDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Specialty} and its DTO {@link SpecialtyDTO}.
 */
@Mapper(componentModel = "spring")
public interface SpecialtyMapper extends EntityMapper<SpecialtyDTO, Specialty> {}
