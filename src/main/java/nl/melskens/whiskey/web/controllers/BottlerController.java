package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.BottlerService;
import nl.melskens.whiskey.web.dtos.bottler.BottlerDto;
import nl.melskens.whiskey.web.mappers.BottlerMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "bottlers")
public class BottlerController {

    private final BottlerService bottlerService;
    private final BottlerMapper bottlerMapper;

    @GetMapping
    List<BottlerDto> getAll() {
        return bottlerMapper.toDtos(bottlerService.getAll());
    }
}
