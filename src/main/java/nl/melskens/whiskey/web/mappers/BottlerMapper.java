package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Bottler;
import nl.melskens.whiskey.web.dtos.bottler.BottlerDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BottlerMapper {

  BottlerDto toDto(Bottler distillery);

  List<BottlerDto> toDtos(List<Bottler> distilleries);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "brands", ignore = true)
  Bottler toEntity(BottlerDto dto);
}
