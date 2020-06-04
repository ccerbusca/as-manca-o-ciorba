package iss.cms.mappers;

import iss.cms.domain.User;
import iss.cms.domain.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface UserMapper {
    @Mapping(target = "programCommitteeMember", ignore = true)
    @Mapping(target = "submissions", ignore = true)
    @Mapping(target = "sections", ignore = true)
    @Mapping(target = "proposals", ignore = true)
    @Mapping(target = "boughtTickets", ignore = true)
    User fromDto(UserDTO userDTO);

    @Mapping(target = "password", ignore = true)
    UserDTO toDto(User user);

    List<UserDTO> toDtoList(List<User> users);
}
