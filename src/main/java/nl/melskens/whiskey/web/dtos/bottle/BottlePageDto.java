package nl.melskens.whiskey.web.dtos.bottle;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class BottlePageDto {
    private List<BottleDto> bottles;
    private long currentPage;
    private long totalItems;
    private long totalPages;
}
