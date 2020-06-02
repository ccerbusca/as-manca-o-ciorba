package iss.cms.repository;

import iss.cms.domain.ProgramCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PCMemberRepository extends JpaRepository<ProgramCommitteeMember, Long> {

    Optional<ProgramCommitteeMember> findProgramCommitteeMemberByUser_Username(String user_username);

}
