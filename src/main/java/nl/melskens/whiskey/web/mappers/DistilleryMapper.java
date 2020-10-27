package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Distillery;
import nl.melskens.whiskey.web.dtos.distillery.DistilleryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DistilleryMapper {

    DistilleryDto toDto(Distillery distillery);

    List<DistilleryDto> toDtos(List<Distillery> distilleries);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "brands", ignore = true)
    Distillery toEntity(DistilleryDto dto);
}
