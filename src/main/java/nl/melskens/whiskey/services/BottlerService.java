package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Bottler;
import nl.melskens.whiskey.repositories.BottlerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BottlerService {
  private final BottlerRepository bottlerRepository;

  public List<Bottler> getAll() {
    return bottlerRepository.findAll();
  }
}
