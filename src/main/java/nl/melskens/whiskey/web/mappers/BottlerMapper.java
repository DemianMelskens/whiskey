package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Bottler;
import nl.melskens.whiskey.web.dtos.bottler.BottlerDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BottlerMapper {

    public abstract BottlerDto toDto(Bottler distillery);

    public abstract List<BottlerDto> toDtos(List<Bottler> distilleries);

    public PageDto<BottlerDto> toPageDto(final Page<Bottler> page) {
        final PageDto<BottlerDto> dto = new PageDto<>();
        dto.setItems(toDtos(page.getContent()));
        dto.setCurrentPage(page.getNumber());
        dto.setTotalItems(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        return dto;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "brands", ignore = true)
    public abstract Bottler toEntity(BottlerDto dto);
}
