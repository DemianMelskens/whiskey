package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.DistilleryService;
import nl.melskens.whiskey.web.dtos.distillery.DistilleryDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import nl.melskens.whiskey.web.mappers.DistilleryMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "distilleries")
public class DistilleryController {

    private final DistilleryService distilleryService;
    private final DistilleryMapper distilleryMapper;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PageDto<DistilleryDto> getAll(
        @RequestParam(required = false) final String criteria,
        @RequestParam(defaultValue = "20") final int pageSize,
        @RequestParam(defaultValue = "0") final int currentPage
    ) {
        final Pageable pageable = PageRequest.of(currentPage, pageSize);
        return distilleryMapper.toPageDto(distilleryService.getAll(criteria, pageable));
    }
}
