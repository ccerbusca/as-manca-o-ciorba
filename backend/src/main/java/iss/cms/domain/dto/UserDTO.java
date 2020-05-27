package iss.cms.domain.dto;

import lombok.*;

import javax.validation.constraints.Email;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String name;
    private String username;
    private String password;
    private String affiliation;
    @Email
    private String email;
}
