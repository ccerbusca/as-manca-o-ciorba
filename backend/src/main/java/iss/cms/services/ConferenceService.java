package iss.cms.services;

import iss.cms.domain.Conference;
import iss.cms.repository.ConferenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
