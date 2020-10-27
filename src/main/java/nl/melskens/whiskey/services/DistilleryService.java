package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Distillery;
import nl.melskens.whiskey.repositories.DistilleryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistilleryService {
    private final DistilleryRepository distilleryRepository;

    public List<Distillery> getAll() {
        return distilleryRepository.findAll();
    }
}
