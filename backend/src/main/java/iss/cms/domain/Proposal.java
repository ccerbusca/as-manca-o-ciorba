package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Proposal extends NamedEntity {

    private LocalDateTime uploadTime;

    private Status status;

    @ElementCollection
    private Set<String> keywords = new HashSet<>();

    @ElementCollection
    private Set<String> topics = new HashSet<>();

    @OneToOne(mappedBy = "proposal", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Submission submission;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Bidding> biddings = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Review> reviews = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference;

    @ManyToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    private User author;
}
