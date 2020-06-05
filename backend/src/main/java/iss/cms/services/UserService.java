package iss.cms.services;

import iss.cms.domain.ProgramCommitteeMember;
import iss.cms.domain.User;
import iss.cms.repository.PCMemberRepository;
import iss.cms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PCMemberRepository pcMemberRepository;

    public UserService(UserRepository userRepository,
                       PCMemberRepository pcMemberRepository)
    {
        this.userRepository = userRepository;
        this.pcMemberRepository = pcMemberRepository;
    }

    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    @Transactional
    public User getUserByUsername(String username)
    {
        return userRepository.findUserByUsername(username).orElseThrow();
    }

    public ProgramCommitteeMember getPCMemberByUsernameForConf(Long id, String username)
    {
        return pcMemberRepository.findProgramCommitteeMemberByUser_UsernameAndConferences_Id(username, id)
                .orElseThrow();
    }
}
