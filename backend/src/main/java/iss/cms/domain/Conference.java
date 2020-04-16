package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Set;


@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Conference extends NamedEntity
{
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime proposalDeadline;
    private LocalDateTime assignmentDeadline;
    private LocalDateTime evaluationDeadline;
    private LocalDateTime resultsDeadline;

    @ManyToMany(mappedBy = "conferences")
    private Set<ProgramCommitteeMember> programCommitteeMembers;

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Section> sections;

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Submission> submissions;
}
