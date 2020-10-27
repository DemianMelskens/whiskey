package nl.melskens.whiskey.web.dtos.bottler;

import lombok.Data;
import nl.melskens.whiskey.domain.enums.Country;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class BottlerDto {

    @NotBlank
    private String name;

    @NotNull
    private Country country;
}
