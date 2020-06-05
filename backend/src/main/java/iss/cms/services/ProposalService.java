package iss.cms.services;

import iss.cms.domain.Bidding;
import iss.cms.domain.ProgramCommitteeMember;
import iss.cms.domain.Proposal;
import iss.cms.domain.Review;
import iss.cms.repository.BiddingRepository;
import iss.cms.repository.PCMemberRepository;
import iss.cms.repository.ProposalRepository;
import iss.cms.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProposalService {
    private final ProposalRepository proposalRepository;
    private final PCMemberRepository pcMemberRepository;
    private final BiddingRepository biddingRepository;
    private final ReviewRepository reviewRepository;

    public ProposalService(ProposalRepository proposalRepository,
                           PCMemberRepository pcMemberRepository,
                           BiddingRepository biddingRepository,
                           ReviewRepository reviewRepository)
    {
        this.proposalRepository = proposalRepository;
        this.pcMemberRepository = pcMemberRepository;
        this.biddingRepository = biddingRepository;
        this.reviewRepository = reviewRepository;
    }

    @Transactional
    public Proposal addProposal(Proposal proposal)
    {
        return proposalRepository.save(proposal);
    }

    public List<Proposal> getProposalsByAuthorUsername(String username)
    {
        return proposalRepository.findProposalsByAuthor_Username(username);
    }

    public List<Proposal> getProposalsByConferenceID(Long id)
    {
        return proposalRepository.findProposalsByConference_Id(id);
    }

    public List<Proposal> findProposalsForAssigningReviews(Long conferenceID)
    {
        return proposalRepository.findProposalsForAssigningReview(conferenceID);
    }

    @Transactional
    public Proposal bidProposal(Long confID, Long propID, String username, Bidding bidding)
    {
        ProgramCommitteeMember programCommitteeMember =
                pcMemberRepository.findProgramCommitteeMemberByUser_UsernameAndConferences_Id(username, confID)
                        .orElseThrow();
        bidding.setPcMember(programCommitteeMember);
        Proposal proposal = proposalRepository.findById(propID).orElseThrow();
        bidding.setProposal(proposal);
        biddingRepository.save(bidding);
        proposal.getBiddings().add(bidding);
        return proposal;
    }

    @Transactional
    public Proposal addReview(Long confID, Long propID, String username, Review review)
    {
        ProgramCommitteeMember programCommitteeMember =
                pcMemberRepository.findProgramCommitteeMemberByUser_UsernameAndConferences_Id(username, confID)
                        .orElseThrow();
        review.setPcMember(programCommitteeMember);
        Proposal proposal = proposalRepository.findById(propID).orElseThrow();
        review.setProposal(proposal);
        reviewRepository.save(review);
        proposal.getReviews().add(review);
        return proposal;
    }

    @Transactional
    public Proposal recommend(Long propID, String username, String recommendation)
    {
        Review review = reviewRepository.findReviewByPcMember_User_UsernameAndProposal_Id(username, propID).orElseThrow();
        review.setRecommendation(recommendation);
        return review.getProposal();
    }

}
