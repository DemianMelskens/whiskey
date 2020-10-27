package nl.melskens.whiskey.web.controllers;

import nl.melskens.whiskey.exceptions.EmailAlreadyInUseException;
import nl.melskens.whiskey.exceptions.UsernameAlreadyInUseException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UsernameAlreadyInUseException.class, EmailAlreadyInUseException.class})
    public ResponseEntity<Object> handleAlreadyUsedException(final RuntimeException ex) {
        final HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(ex.getMessage(), headers, HttpStatus.BAD_REQUEST);
    }
}
