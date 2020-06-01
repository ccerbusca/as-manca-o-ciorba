package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Submission extends BaseEntity {

    private String abstractPaperUrl;

    private String fullPaperUrl;

    @OneToOne
    @JoinColumn(name = "proposal_id", referencedColumnName = "id")
    private Proposal proposal;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
