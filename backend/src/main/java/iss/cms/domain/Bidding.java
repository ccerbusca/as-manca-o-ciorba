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
public class Bidding extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private BidResult result;

    @ManyToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    private Proposal proposal;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "pc_id", nullable = false)
    private ProgramCommitteeMember pcMember;

}
