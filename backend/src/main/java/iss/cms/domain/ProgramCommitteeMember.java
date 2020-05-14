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

    @OneToOne
    @MapsId
    private User user;

    private String conferencePassword;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String personalWebpage;

    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Bidding> biddings = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "committee_membership",
            joinColumns = {@JoinColumn(name = "pc_id")},
            inverseJoinColumns = {@JoinColumn(name = "conference_id")}
    )
    private Set<Conference> conferences = new HashSet<>();
}
