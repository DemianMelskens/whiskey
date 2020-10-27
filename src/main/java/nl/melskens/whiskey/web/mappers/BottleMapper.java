package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Bottle;
import nl.melskens.whiskey.web.dtos.bottle.BottleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BottleMapper {

    BottleDto toDto(Bottle dto);

    List<BottleDto> toDtos(List<Bottle> whiskies);

    @Mapping(target = "id", ignore = true)
    Bottle toEntity(BottleDto dto);
}
