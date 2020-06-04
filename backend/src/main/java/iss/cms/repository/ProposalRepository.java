package iss.cms.repository;

import iss.cms.domain.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    List<Proposal> findProposalsByAuthor_Username(String author_username);

}
