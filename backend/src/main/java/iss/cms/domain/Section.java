package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
}
