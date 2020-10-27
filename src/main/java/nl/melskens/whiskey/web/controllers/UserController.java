package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.User;
import nl.melskens.whiskey.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAll() {
        return this.userService.getAll();
    }
}
