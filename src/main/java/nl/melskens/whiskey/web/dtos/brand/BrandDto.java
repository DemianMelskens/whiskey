package nl.melskens.whiskey.web.dtos.brand;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class BrandDto {

    @NotBlank
    private String name;
}
