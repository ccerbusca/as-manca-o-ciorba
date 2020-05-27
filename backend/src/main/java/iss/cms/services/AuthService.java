package iss.cms.services;

import iss.cms.domain.User;
import iss.cms.exceptions.EmailAlreadyTakenException;
import iss.cms.exceptions.UserAlreadyExistsException;
import iss.cms.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void register(User user)
    {
        Optional<User> userByUsername = userRepository.findUserByUsername(user.getUsername());
        if (userByUsername.isPresent())
            throw new UserAlreadyExistsException();
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent())
            throw new EmailAlreadyTakenException();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean login(User user)
    {
        User found = userRepository.findUserByUsername(user.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User not found: %s", user.getUsername())));
        return passwordEncoder.matches(user.getPassword(), found.getPassword());
    }
}
