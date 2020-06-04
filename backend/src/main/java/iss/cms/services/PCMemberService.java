package iss.cms.services;

import iss.cms.domain.ProgramCommitteeMember;
import iss.cms.domain.User;
import iss.cms.repository.PCMemberRepository;
import iss.cms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PCMemberService {

    private final PCMemberRepository pcMemberRepository;
    private final UserRepository userRepository;

    public PCMemberService(PCMemberRepository pcMemberRepository, UserRepository userRepository)
    {
        this.pcMemberRepository = pcMemberRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProgramCommitteeMember addPCMember(ProgramCommitteeMember programCommitteeMember)
    {
        User user = userRepository.findById(programCommitteeMember.getUser().getId()).orElseThrow();
        programCommitteeMember.setUser(user);
        return pcMemberRepository.save(programCommitteeMember);
    }

}
