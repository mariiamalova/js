package com.example.demo.controller;


import com.example.exception_handling.NoSuchUserException;

import com.example.model.User;
import com.example.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyRestController {
    private final UserServiceImpl userService;

    @Autowired
    public MyRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> list = userService.listUsers();
        return  new ResponseEntity<>(list, HttpStatus.OK);
    }

//    @GetMapping("/users/{id}")
//    public User getUser(@PathVariable int id) {
//        User user = userService.getUserById(id);
//        if (user == null) {
//            throw new NoSuchUserException("There is no user wi th id = " + id + " in Database");
//        }
//        return user;
//    }


    @PostMapping("/users")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public  ResponseEntity<User> deleteUser(@PathVariable int id) {
        userService.removeUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/admin/user")
    public ResponseEntity<User> getPrincipal(Principal principal) {
        User user = userService.findByUsername(principal.getName()).get();
        return new ResponseEntity<>(user, HttpStatus.FOUND);
    }
}

