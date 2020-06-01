package iss.cms.repository;

import iss.cms.domain.ProgramCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PCMemberRepository extends JpaRepository<ProgramCommitteeMember, Long> {
}
