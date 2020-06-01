package iss.cms.domain.dto;

import lombok.Data;

@Data
public class ProgramCommitteeMemberDTO {
    private UserDTO user;
    private String role;
    private String personalWebpage;
}
