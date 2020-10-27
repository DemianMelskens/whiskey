package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.User;
import nl.melskens.whiskey.web.dtos.user.RegisterDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", source = "password", qualifiedByName = "encodePassword")
    public abstract User toEntity(RegisterDto dto);

    @Named("encodePassword")
    String encodePassword(String password) {
        return encoder.encode(password);
    }
}
