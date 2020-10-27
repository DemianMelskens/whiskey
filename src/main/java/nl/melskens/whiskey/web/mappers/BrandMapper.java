package nl.melskens.whiskey.web.mappers;

import nl.melskens.whiskey.domain.Brand;
import nl.melskens.whiskey.web.dtos.brand.BrandDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandDto toDto(Brand brand);

    List<BrandDto> toDtos(List<Brand> brands);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "distillery", ignore = true)
    @Mapping(target = "whiskies", ignore = true)
    Brand toEntity(BrandDto dto);
}
