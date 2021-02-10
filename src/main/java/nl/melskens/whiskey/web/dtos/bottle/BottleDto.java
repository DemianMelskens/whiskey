package nl.melskens.whiskey.web.dtos.bottle;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class BottleDto {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Long age;

    @NotNull
    private Long abv;

    @NotNull
    private Long volume;

    private boolean favorite;
}
