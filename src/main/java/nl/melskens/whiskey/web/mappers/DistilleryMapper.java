package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Distillery;
import nl.melskens.whiskey.web.dtos.distillery.DistilleryDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class DistilleryMapper {

    public abstract DistilleryDto toDto(Distillery distillery);

    public abstract List<DistilleryDto> toDtos(List<Distillery> distilleries);

    public PageDto<DistilleryDto> toPageDto(final Page<Distillery> page) {
        final PageDto<DistilleryDto> dto = new PageDto<>();
        dto.setItems(toDtos(page.getContent()));
        dto.setCurrentPage(page.getNumber());
        dto.setTotalItems(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        return dto;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "brands", ignore = true)
    public abstract Distillery toEntity(DistilleryDto dto);
}
