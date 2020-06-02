package iss.cms.domain.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProposalDTO {
    private String name;
    private LocalDateTime uploadTime;
    private List<ReviewDTO> reviews;
    private List<BiddingDTO> biddings;
    private SubmissionDTO submission;
    private UserDTO author;
    private String status;
    private int conferenceID;
}
