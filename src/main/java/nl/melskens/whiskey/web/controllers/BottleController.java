package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.BottleService;
import nl.melskens.whiskey.web.dtos.bottle.AddFavoritesDto;
import nl.melskens.whiskey.web.dtos.bottle.BottleDto;
import nl.melskens.whiskey.web.dtos.bottle.UpdateFavoritesDto;
import nl.melskens.whiskey.web.mappers.BottleMapper;
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
  public List<BottleDto> getAll() {
    return bottleMapper.toDtos(bottleService.getAll());
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public BottleDto create(@Valid @RequestBody final BottleDto dto) {
    return bottleMapper.toDto(bottleService.create(bottleMapper.toEntity(dto)));
  }

  @GetMapping(path = "/favorites", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<BottleDto> getFavorites() {
    return bottleMapper.toDtos(bottleService.getFavorites());
  }

  @PostMapping(path = "/favorites", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> addFavorite(@Valid @RequestBody final AddFavoritesDto dto) {
    bottleService.addFavorite(dto.getId());
    return ResponseEntity.ok().build();
  }

  @PutMapping(path = "/favorites", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateFavorites(@RequestBody final UpdateFavoritesDto dto) {
    bottleService.updateFavorites(dto.getIds());
    return ResponseEntity.ok().build();
  }
}