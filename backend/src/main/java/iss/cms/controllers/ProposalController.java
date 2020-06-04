package iss.cms.controllers;

import iss.cms.domain.dto.ProposalDTO;
import iss.cms.mappers.ProposalMapper;
import iss.cms.services.ProposalService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProposalController {
    private final ProposalService proposalService;
    private final ProposalMapper proposalMapper;

    public ProposalController(ProposalService proposalService, ProposalMapper proposalMapper)
    {
        this.proposalService = proposalService;
        this.proposalMapper = proposalMapper;
    }

    @RequestMapping(value = "/proposals/{username}")
    public List<ProposalDTO> getProposalsByUsername(@PathVariable String username)
    {
        return proposalMapper.toDtoList(proposalService.getProposalsByAuthorUsername(username));
    }
}
