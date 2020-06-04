package iss.cms.domain.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ConferenceDTO {
    private int id;
    private String title;
    private String generalInfo;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime proposalDeadline;
    private LocalDateTime assignmentDeadline;
    private LocalDateTime evaluationDeadline;
    private LocalDateTime resultsDeadline;
    private List<ProgramCommitteeMemberDTO> pcMembers;
    private List<ProposalDTO> proposals;
    private List<UserDTO> purchased;
}
