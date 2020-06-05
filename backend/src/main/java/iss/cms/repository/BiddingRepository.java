package iss.cms.repository;

import iss.cms.domain.Bidding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BiddingRepository extends JpaRepository<Bidding, Long> {
}
