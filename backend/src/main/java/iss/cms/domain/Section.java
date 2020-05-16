package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Section extends NamedEntity {

    private Date startTime;

    private Date endTime;

    private int expectedAttendance;

    private String presentationUrl;

    @ManyToMany(mappedBy = "sections")
    private Set<User> users = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schair_id", referencedColumnName = "id")
    private ProgramCommitteeMember sectionChair;
}
