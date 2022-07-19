package com.example.demo.controller;


import com.example.exception_handling.NoSuchUserException;

import com.example.model.User;
import com.example.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<User> showAllUsers() {
        System.out.println(userService.listUsers().toString());
        return userService.listUsers();
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
    public User addNewUser (@RequestBody User user){
        userService.addUser(user);
        return user;
    }
    @PutMapping("/users")
    public User updateUser (@RequestBody User user){
         userService.updateUser(user);
         return user ;
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id){
        userService.removeUser(id);
        return "user with id " + id + " deleted";
    }

    @GetMapping("/admin/user")
    public User getPrincipal( Principal principal) {
        User user = userService.findByUsername(principal.getName()).get();
        return user;
    }
}

