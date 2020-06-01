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

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "pcMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Bidding> biddings = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "programCommitteeMembers")
    private Set<Conference> conferences = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(mappedBy = "sectionChair")
    private Section section;
}
