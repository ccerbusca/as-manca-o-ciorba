package iss.cms.mappers;

import iss.cms.domain.Proposal;
import iss.cms.domain.dto.ProposalDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(uses = {ReviewMapper.class, BiddingMapper.class, SubmissionMapper.class, UserMapper.class})
public interface ProposalMapper {

    @Mapping(target = "conferenceID", source = "conference.id")
    ProposalDTO toDto(Proposal proposal);

    @Mapping(target = "conference", ignore = true)
    @Mapping(target = "topics", ignore = true)
    @Mapping(target = "keywords", ignore = true)
    @Mapping(target = "author", ignore = true)
    Proposal fromDto(ProposalDTO proposalDTO);

    List<ProposalDTO> toDtoList(List<Proposal> proposals);

    List<Proposal> fromDtoList(List<ProposalDTO> proposalDTOS);
}
