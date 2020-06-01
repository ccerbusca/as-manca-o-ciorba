package iss.cms.mappers;

import iss.cms.domain.ProgramCommitteeMember;
import iss.cms.domain.dto.ProgramCommitteeMemberDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {UserMapper.class})
public interface PCMemberMapper {

    @Mapping(target = "user", source = "user", qualifiedByName = "noPassword")
    ProgramCommitteeMemberDTO toDto(ProgramCommitteeMember programCommitteeMember);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "biddings", ignore = true)
    @Mapping(target = "conferences", ignore = true)
    @Mapping(target = "section", ignore = true)
    ProgramCommitteeMember fromDto(ProgramCommitteeMemberDTO programCommitteeMemberDTO);
}
