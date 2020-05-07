package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Review extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private ReviewResult result;

    @ManyToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    private Proposal proposal;

    @ManyToOne
    @JoinColumn(name = "pc_id", nullable = false)
    private ProgramCommitteeMember pcMember;

}
