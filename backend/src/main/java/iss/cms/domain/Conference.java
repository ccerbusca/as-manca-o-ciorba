package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@NamedEntityGraph(
        name = "conference-pcmembers",
        attributeNodes = { @NamedAttributeNode(value = "programCommitteeMembers", subgraph = "pcmember-user")},
        subgraphs = {
                @NamedSubgraph(
                        name = "pcmember-user",
                        attributeNodes = {
                                @NamedAttributeNode("user")
                        }
                )
        }
)
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Conference extends NamedEntity {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LocalDateTime proposalDeadline;

    private LocalDateTime assignmentDeadline;

    private LocalDateTime evaluationDeadline;

    private LocalDateTime resultsDeadline;

    private String conferencePassword;

    private String generalInfo;

    @ManyToMany(mappedBy = "conferences")
    private Set<ProgramCommitteeMember> programCommitteeMembers = new HashSet<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Section> sections = new HashSet<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Submission> submissions = new HashSet<>();
}
