package iss.cms.mappers;

import iss.cms.domain.Submission;
import iss.cms.domain.dto.SubmissionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ProposalMapper.class})
public interface SubmissionMapper {

    SubmissionDTO toDto(Submission submission);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "proposal", ignore = true)
    @Mapping(target = "id", ignore = true)
    Submission fromDto(SubmissionDTO submissionDTO);

}
