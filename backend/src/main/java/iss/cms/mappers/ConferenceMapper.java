package iss.cms.mappers;

import iss.cms.domain.Conference;
import iss.cms.domain.dto.ConferenceDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(uses = {PCMemberMapper.class, UserMapper.class})
public interface ConferenceMapper {

    @Mapping(target = "title", source = "name")
    @Mapping(target = "pcMembers", source = "programCommitteeMembers")
    ConferenceDTO toDto(Conference conference);

    @InheritInverseConfiguration
    @Mapping(target = "conferencePassword", ignore = true)
    @Mapping(target = "sections", ignore = true)
    Conference fromDto(ConferenceDTO conferenceDTO);

    List<ConferenceDTO> toDtoList(List<Conference> conferences);

    List<Conference> fromDtoList(List<ConferenceDTO> conferenceDTOs);

}
