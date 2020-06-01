package iss.cms.controllers;

import iss.cms.domain.dto.ConferenceDTO;
import iss.cms.mappers.ConferenceMapper;
import iss.cms.services.ConferenceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConferenceController {

    private final ConferenceMapper conferenceMapper;
    private final ConferenceService conferenceService;

    public ConferenceController(ConferenceMapper conferenceMapper, ConferenceService conferenceService)
    {
        this.conferenceMapper = conferenceMapper;
        this.conferenceService = conferenceService;
    }

    @RequestMapping(value = "/conferences", method = RequestMethod.GET)
    public List<ConferenceDTO> getConferences()
    {
        return conferenceMapper.toDtoList(conferenceService.getConferences());
    }

}