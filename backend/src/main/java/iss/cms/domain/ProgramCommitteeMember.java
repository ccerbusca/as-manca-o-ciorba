package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class ProgramCommitteeMember extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private Role role;

    private String personalWebpage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Bidding> biddings = new HashSet<>();

    @ManyToMany(mappedBy = "programCommitteeMembers")
    private Set<Conference> conferences = new HashSet<>();

    @OneToOne(mappedBy = "sectionChair")
    private Section section;
}
