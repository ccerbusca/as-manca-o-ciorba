package iss.cms.services;

import iss.cms.domain.Conference;
import iss.cms.repository.ConferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;

    public ConferenceService(ConferenceRepository conferenceRepository) {

        this.conferenceRepository = conferenceRepository;
    }

    public List<Conference> getConferences() {
        return conferenceRepository.findAllBy();
    }
}
