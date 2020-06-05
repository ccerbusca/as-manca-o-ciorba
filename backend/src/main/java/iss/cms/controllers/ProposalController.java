package iss.cms.controllers;

import iss.cms.domain.dto.BiddingDTO;
import iss.cms.domain.dto.ProposalDTO;
import iss.cms.domain.dto.ReviewDTO;
import iss.cms.mappers.BiddingMapper;
import iss.cms.mappers.ProposalMapper;
import iss.cms.mappers.ReviewMapper;
import iss.cms.services.ProposalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProposalController {
    private final ProposalService proposalService;
    private final ProposalMapper proposalMapper;
    private final BiddingMapper biddingMapper;
    private final ReviewMapper reviewMapper;

    public ProposalController(ProposalService proposalService,
                              ProposalMapper proposalMapper,
                              BiddingMapper biddingMapper,
                              ReviewMapper reviewMapper)
    {
        this.proposalService = proposalService;
        this.proposalMapper = proposalMapper;
        this.biddingMapper = biddingMapper;
        this.reviewMapper = reviewMapper;
    }

    @RequestMapping(value = "/proposals/{username}", method = RequestMethod.GET)
    public List<ProposalDTO> getProposalsByUsername(@PathVariable String username)
    {
        return proposalMapper.toDtoList(proposalService.getProposalsByAuthorUsername(username));
    }

    @RequestMapping(value = "/proposals/conf/{id}", method = RequestMethod.GET)
    public List<ProposalDTO> getProposalsByConferenceID(@PathVariable Long id)
    {
        return proposalMapper.toDtoList(proposalService.getProposalsByConferenceID(id));
    }

    @RequestMapping(value = "/proposals/conf/{id}/assign", method = RequestMethod.GET)
    public List<ProposalDTO> findProposalsForAssigningReviewers(@PathVariable Long id)
    {
        return proposalMapper.toDtoList(proposalService.findProposalsForAssigningReviews(id));
    }

    @RequestMapping(value = "/conf/{confID}/proposals/{propID}/bid", method = RequestMethod.POST)
    public ProposalDTO bidOnProposal(@PathVariable Long confID, @PathVariable Long propID, @RequestBody BiddingDTO biddingDTO)
    {
        return proposalMapper.toDto(proposalService.bidProposal(confID, propID, biddingDTO.getUsername(), biddingMapper.fromDto(biddingDTO)));
    }

    @RequestMapping(value = "/proposals/{propID}/review", method = RequestMethod.POST)
    public ProposalDTO reviewProposal(@PathVariable Long propID, @RequestBody ReviewDTO reviewDTO)
    {
        return proposalMapper.toDto(proposalService.updateReview(propID, reviewDTO.getUsername(), reviewMapper.fromDto(reviewDTO)));
    }

    @RequestMapping(value = "/conf/{confID}/proposals/{propID}/addreviewer", method = RequestMethod.POST)
    public ProposalDTO addReviewer(@PathVariable Long confID, @PathVariable Long propID, @RequestBody ReviewDTO reviewDTO)
    {
        return proposalMapper.toDto(proposalService.addReview(confID, propID, reviewDTO.getUsername()));
    }

    @RequestMapping(value = "/proposals/{propID}/recommend", method = RequestMethod.POST)
    public ProposalDTO recommendReview(@PathVariable Long propID, @RequestBody ReviewDTO reviewDTO)
    {
        return proposalMapper.toDto(proposalService.recommend(propID, reviewDTO.getUsername(), reviewDTO.getRecommendation()));
    }

    @RequestMapping(value = "/conf/{confID}/proposals", method = RequestMethod.POST)
    public ProposalDTO addProposal(@PathVariable Long confID, @RequestBody ProposalDTO proposalDTO)
    {
        return proposalMapper.toDto(proposalService.addProposal(confID, proposalMapper.fromDto(proposalDTO)));
    }
}
