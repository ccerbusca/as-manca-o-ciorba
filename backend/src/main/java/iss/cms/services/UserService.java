package iss.cms.services;

import iss.cms.domain.User;
import iss.cms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    @Transactional
    public User getPCMemberByUsername(String username)
    {
        return userRepository.findUserByUsername(username).orElseThrow();
    }

}
