package iss.cms.controllers;

import iss.cms.domain.dto.UserDTO;
import iss.cms.mappers.UserMapper;
import iss.cms.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AuthService authService;

    public AuthController(PasswordEncoder passwordEncoder, UserMapper userMapper, AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.authService = authService;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody @Valid UserDTO userDTO)
    {
        authService.register(userMapper.fromDto(userDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO)
    {
        if (authService.login(userMapper.fromDto(userDTO)))
        {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong password", HttpStatus.UNAUTHORIZED);
    }

}
