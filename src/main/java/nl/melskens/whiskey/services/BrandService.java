package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Brand;
import nl.melskens.whiskey.repositories.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public List<Brand> getAll() {
        return brandRepository.findAll();
    }
}
