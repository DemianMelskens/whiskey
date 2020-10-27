package nl.melskens.whiskey.web.dtos.bottle;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class AddFavoritesDto {

    @Min(0)
    @NotNull
    Long id;
}
