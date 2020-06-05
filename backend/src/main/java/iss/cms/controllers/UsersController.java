package iss.cms.controllers;

import iss.cms.domain.dto.ProgramCommitteeMemberDTO;
import iss.cms.domain.dto.UserDTO;
import iss.cms.mappers.PCMemberMapper;
import iss.cms.mappers.UserMapper;
import iss.cms.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    private final UserMapper userMapper;
    private final UserService userService;
    private final PCMemberMapper pcMemberMapper;

    public UsersController(UserMapper userMapper, UserService userService, PCMemberMapper pcMemberMapper)
    {
        this.userMapper = userMapper;
        this.userService = userService;
        this.pcMemberMapper = pcMemberMapper;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<UserDTO> getUsers()
    {
        return userMapper.toDtoList(userService.getUsers());
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public UserDTO getUser(@RequestBody String username)
    {
        return userMapper.toDto(userService.getUserByUsername(username));
    }

    @RequestMapping(value = "/conf/{id}/pcmember/{username}")
    ProgramCommitteeMemberDTO getPCMemberForConferenceByUsername(@PathVariable Long id, @PathVariable String username)
    {
        return pcMemberMapper.toDto(userService.getPCMemberByUsernameForConf(id, username));
    }

}
