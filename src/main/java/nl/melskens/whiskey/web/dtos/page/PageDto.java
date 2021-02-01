package nl.melskens.whiskey.web.dtos.page;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PageDto<T> {
    private List<T> items;
    private long currentPage;
    private long totalItems;
    private long totalPages;
}
