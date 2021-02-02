package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.services.BottlerService;
import nl.melskens.whiskey.web.dtos.bottler.BottlerDto;
import nl.melskens.whiskey.web.dtos.page.PageDto;
import nl.melskens.whiskey.web.mappers.BottlerMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "bottlers")
public class BottlerController {

    private final BottlerService bottlerService;
    private final BottlerMapper bottlerMapper;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PageDto<BottlerDto> getAll(
        @RequestParam(required = false) final String criteria,
        @RequestParam(defaultValue = "20") final int pageSize,
        @RequestParam(defaultValue = "0") final int currentPage
    ) {
        final Pageable pageable = PageRequest.of(currentPage, pageSize);
        return bottlerMapper.toPageDto(bottlerService.getAll(criteria, pageable));
    }
}
