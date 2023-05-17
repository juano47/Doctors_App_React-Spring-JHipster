package com.delaiglesia.jhipsterbackend.service.mapper;

import com.delaiglesia.jhipsterbackend.domain.Doctor;
import com.delaiglesia.jhipsterbackend.domain.Place;
import com.delaiglesia.jhipsterbackend.domain.Specialty;
import com.delaiglesia.jhipsterbackend.service.dto.DoctorDTO;
import com.delaiglesia.jhipsterbackend.service.dto.PlaceDTO;
import com.delaiglesia.jhipsterbackend.service.dto.SpecialtyDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Doctor} and its DTO {@link DoctorDTO}.
 */
@Mapper(componentModel = "spring")
public interface DoctorMapper extends EntityMapper<DoctorDTO, Doctor> {
    @Mapping(target = "places", source = "places", qualifiedByName = "placeIdSet")
    @Mapping(target = "specialties", source = "specialties", qualifiedByName = "specialtyIdSet")
    DoctorDTO toDto(Doctor s);

    @Mapping(target = "removePlace", ignore = true)
    @Mapping(target = "removeSpecialty", ignore = true)
    Doctor toEntity(DoctorDTO doctorDTO);

    @Named("placeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PlaceDTO toDtoPlaceId(Place place);

    @Named("placeIdSet")
    default Set<PlaceDTO> toDtoPlaceIdSet(Set<Place> place) {
        return place.stream().map(this::toDtoPlaceId).collect(Collectors.toSet());
    }

    @Named("specialtyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SpecialtyDTO toDtoSpecialtyId(Specialty specialty);

    @Named("specialtyIdSet")
    default Set<SpecialtyDTO> toDtoSpecialtyIdSet(Set<Specialty> specialty) {
        return specialty.stream().map(this::toDtoSpecialtyId).collect(Collectors.toSet());
    }
}
