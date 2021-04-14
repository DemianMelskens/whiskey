package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.BottleService;
import nl.melskens.whiskey.web.dtos.bottle.BottleDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import nl.melskens.whiskey.web.mappers.BottleMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/bottles")
public class BottleController {

    private final BottleService bottleService;
    private final BottleMapper bottleMapper;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PageDto<BottleDto> getAll(
        @RequestParam(required = false) final String criteria,
        @RequestParam(defaultValue = "20") final int pageSize,
        @RequestParam(defaultValue = "0") final int currentPage
    ) {
        final Pageable pageable = PageRequest.of(currentPage, pageSize);
        return bottleMapper.toPageDto(bottleService.getAll(criteria, pageable));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public BottleDto create(@Valid @RequestBody final BottleDto dto) {
        return bottleMapper.toDto(bottleService.create(bottleMapper.toEntity(dto)));
    }

    @GetMapping(path = "/favorites", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BottleDto> getFavorites() {
        return bottleMapper.toDtos(bottleService.getFavorites());
    }

    @PostMapping(path = "/favorites/{bottleId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> toggleFavorite(@PathVariable("bottleId") final Long bottleId) {
        bottleService.toggleFavorite(bottleId);
        return ResponseEntity.ok().build();
    }
}
