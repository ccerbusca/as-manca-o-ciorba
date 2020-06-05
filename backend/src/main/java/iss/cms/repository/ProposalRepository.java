package iss.cms.repository;

import iss.cms.domain.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    List<Proposal> findProposalsByAuthor_Username(String author_username);

    List<Proposal> findProposalsByConference_Id(Long conference_id);

    @Query("select p from Proposal p where p.conference.id = ?1 and p.biddings.size >= 2 and p.reviews.size = 0")
    List<Proposal> findProposalsForAssigningReview(Long id);

}
