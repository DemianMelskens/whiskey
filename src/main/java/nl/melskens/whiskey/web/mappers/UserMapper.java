package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.User;
import nl.melskens.whiskey.web.dtos.user.RegisterDto;
import nl.melskens.whiskey.web.dtos.user.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    private BCryptPasswordEncoder encoder;

    public abstract UserDto toDto(User user);

    public abstract List<UserDto> toDtos(List<User> user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", source = "password", qualifiedByName = "encodePassword")
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "lastLogin", ignore = true)
    @Mapping(target = "favorites", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    public abstract User toEntity(RegisterDto dto);

    @Named("encodePassword")
    String encodePassword(final String password) {
        return encoder.encode(password);
    }
}
