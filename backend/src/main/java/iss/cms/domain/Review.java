package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Review extends BaseEntity {

    private ReviewResult result;
    @ManyToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    private Proposal proposal;

    @ManyToOne
    @JoinColumn(name = "pc_id", nullable = false)
    private ProgramCommitteeMember pcMember;

    enum ReviewResult {
        STRONG_ACCEPT, ACCEPT, WEAK_ACCEPT, BORDERLINE_PAPER,
        WEAK_REJECT, REJECT, STRONG_REJECT
    }
}
