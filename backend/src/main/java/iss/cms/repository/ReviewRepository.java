package iss.cms.repository;

import iss.cms.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findReviewByPcMember_User_UsernameAndProposal_Id(String pcMember_user_username, Long proposal_id);

}
