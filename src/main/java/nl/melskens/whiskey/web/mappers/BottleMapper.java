package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Bottle;
import nl.melskens.whiskey.web.dtos.bottle.BottleDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BottleMapper {

    public abstract BottleDto toDto(Bottle dto);

    public abstract List<BottleDto> toDtos(List<Bottle> bottles);

    public PageDto<BottleDto> toPageDto(final Page<Bottle> page) {
        final PageDto<BottleDto> dto = new PageDto<>();
        dto.setItems(toDtos(page.getContent()));
        dto.setCurrentPage(page.getNumber());
        dto.setTotalItems(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        return dto;
    }

    @Mapping(target = "brand", ignore = true)
    public abstract Bottle toEntity(BottleDto dto);
}
