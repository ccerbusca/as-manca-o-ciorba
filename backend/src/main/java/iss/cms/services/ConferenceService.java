package iss.cms.services;

import iss.cms.domain.Conference;
import iss.cms.repository.ConferenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final PCMemberService pcMemberService;

    public ConferenceService(ConferenceRepository conferenceRepository, PCMemberService pcMemberService) {
        this.conferenceRepository = conferenceRepository;
        this.pcMemberService = pcMemberService;
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
            c.setInterestedUsers(fromDto.getInterestedUsers());
                }
        );
        return conference.orElse(null);
    }
}
