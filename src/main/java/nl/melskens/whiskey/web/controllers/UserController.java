package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.UserService;
import nl.melskens.whiskey.web.dtos.user.UserDto;
import nl.melskens.whiskey.web.mappers.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/users")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    @GetMapping
    public List<UserDto> getAll() {
        return this.userMapper.toDtos(this.userService.getAll());
    }

    @GetMapping(path = "/current")
    public UserDto getCurrentUser() {
        return this.userMapper.toDto(this.userService.getCurrentUser());
    }
}
