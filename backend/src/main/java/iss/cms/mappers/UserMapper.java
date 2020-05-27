package iss.cms.mappers;

import iss.cms.domain.User;
import iss.cms.domain.dto.UserDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface UserMapper {
    @Mapping(target = "programCommitteeMember", ignore = true)
    @Mapping(target = "submissions", ignore = true)
    @Mapping(target = "sections", ignore = true)
    @Mapping(target = "proposals", ignore = true)
    @Mapping(target = "id", ignore = true)
    User fromDto(UserDTO userDTO);

    @InheritInverseConfiguration
    UserDTO toDto(User user);

}
