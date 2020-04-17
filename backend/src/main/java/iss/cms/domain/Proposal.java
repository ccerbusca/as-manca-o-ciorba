package iss.cms.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Entity
public class Proposal extends NamedEntity {
    private String name;
    private LocalDateTime uploadTime;

    @ElementCollection
    private Set<String> keywords = new HashSet<>();

    @ElementCollection
    private Set<String> topics = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "authorship",
            joinColumns = {@JoinColumn(name = "proposal_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> authors = new HashSet<>();
}
