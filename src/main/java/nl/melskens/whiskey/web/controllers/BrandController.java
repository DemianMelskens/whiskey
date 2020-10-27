package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.BrandService;
import nl.melskens.whiskey.web.dtos.brand.BrandDto;
import nl.melskens.whiskey.web.mappers.BrandMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "brands")
public class BrandController {

    private final BrandService brandService;
    private final BrandMapper brandMapper;

    @GetMapping
    public List<BrandDto> getAll() {
        return brandMapper.toDtos(brandService.getAll());
    }
}
