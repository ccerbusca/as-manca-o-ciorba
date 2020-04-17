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
public class Submission extends BaseEntity
{

    private String abstractPaperUrl;

    private String fullPaperUrl;

    @OneToOne(mappedBy = "submission")
    private Proposal proposal;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="conference_id", nullable = false)
    private Conference conference;
}
