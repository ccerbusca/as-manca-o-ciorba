package iss.cms.services;

import iss.cms.domain.Conference;
import iss.cms.domain.User;
import iss.cms.repository.ConferenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final PCMemberService pcMemberService;
    private final ProposalService proposalService;
    private final UserService userService;

    public ConferenceService(ConferenceRepository conferenceRepository,
                             PCMemberService pcMemberService,
                             UserService userService,
                             ProposalService proposalService) {
        this.conferenceRepository = conferenceRepository;
        this.pcMemberService = pcMemberService;
        this.userService = userService;
        this.proposalService = proposalService;
    }

    public List<Conference> getConferences() {
        return conferenceRepository.findAllBy();
    }

    @Transactional
    public Conference addConference(Conference conference) {
        conference.getProgramCommitteeMembers().forEach(pcMemberService::addPCMember);
        return conferenceRepository.save(conference);
    }

    @Transactional
    public Conference updateConference(Conference fromDto) {
        Optional<Conference> conference = conferenceRepository.findById(fromDto.getId());
        conference.ifPresent(c -> {
                    c.setProposalDeadline(fromDto.getProposalDeadline());
                    c.setAssignmentDeadline(fromDto.getAssignmentDeadline());
                    c.setEvaluationDeadline(fromDto.getEvaluationDeadline());
                    c.setResultsDeadline(fromDto.getResultsDeadline());
                    fromDto.getInterestedUsers().forEach(user -> {
                        User userToBeAdded = userService.getPCMemberByUsername(user.getUsername());
                        c.getInterestedUsers().add(userToBeAdded);
                    });
                    fromDto.getProposals().forEach(proposal -> proposal.setConference(c));
                    c.getProposals().addAll(fromDto.getProposals().stream()
                            .map(proposalService::addProposal).collect(Collectors.toSet()));
                }
        );
        return conference.orElse(null);
    }
}
