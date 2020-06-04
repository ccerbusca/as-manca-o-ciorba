package iss.cms.services;

import iss.cms.domain.Proposal;
import iss.cms.repository.ProposalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProposalService {
    private final ProposalRepository proposalRepository;

    public ProposalService(ProposalRepository proposalRepository)
    {
        this.proposalRepository = proposalRepository;
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

}
