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
public class Section extends NamedEntity
{

    private Date start_time;

    private Date end_time;

    private int expected_attendance;

    private String presentation_url;

    @ManyToMany
    @JoinTable(
            name = "ticket",
            joinColumns = {@JoinColumn(name = "section_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> users = new HashSet<>(); //supervisors

    @ManyToOne
    @JoinColumn(name="conference_id", nullable = false)
    private Conference conference;
}
