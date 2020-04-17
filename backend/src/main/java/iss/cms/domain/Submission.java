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

    private String abstract_paper_url;

    private String full_paper_url;

    @OneToOne(mappedBy = "submission", cascade = CascadeType.ALL)
    private Proposal proposal;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="conference_id", nullable = false)
    private Conference conference;
}
