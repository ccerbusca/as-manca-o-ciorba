package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
@Table(name="cms_user")
public class User extends NamedEntity
{
    private String affiliation;

    @Email
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ProgramCommitteeMember programCommitteeMember;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Submission> submissions = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name="ticket",
            joinColumns = { @JoinColumn(name="user_id") },
            inverseJoinColumns = { @JoinColumn(name="section_id") }
    )
    private Set<Section> sections = new HashSet<>();
}
