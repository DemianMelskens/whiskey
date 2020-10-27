package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.DistilleryService;
import nl.melskens.whiskey.web.dtos.distillery.DistilleryDto;
import nl.melskens.whiskey.web.mappers.DistilleryMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "distilleries")
public class DistilleryController {

    private final DistilleryService distilleryService;
    private final DistilleryMapper distilleryMapper;

    @GetMapping
    List<DistilleryDto> getAll() {
        return distilleryMapper.toDtos(distilleryService.getAll());
    }
}
