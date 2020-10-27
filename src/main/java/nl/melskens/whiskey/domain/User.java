package nl.melskens.whiskey.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nl.melskens.whiskey.domain.abstracts.AbstractAuditingEntity;
import nl.melskens.whiskey.domain.enums.Role;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String username;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(name = "last_login")
    private Instant lastLogin;

    @ManyToMany
    @JoinTable(name = "favorites",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "whiskey_id")})
    private List<Bottle> favorites = new ArrayList<>();

    public void addFavorite(final Bottle bottle) {
        this.favorites.add(bottle);
    }
}

