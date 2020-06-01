package iss.cms.repository;

import iss.cms.domain.Conference;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    @EntityGraph("conference-pcmembers")
    List<Conference> findAllBy();

}
