package nl.melskens.whiskey.web.dtos.bottle;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class UpdateFavoritesDto {

    @NotNull
    List<Long> ids;
}
