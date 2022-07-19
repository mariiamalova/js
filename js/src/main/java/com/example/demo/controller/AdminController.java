package com.example.demo.controller;
import com.example.model.User;
import com.example.services.RoleServiceImpl;
import com.example.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;



@Controller
public class AdminController {
    private UserServiceImpl userService;
    private RoleServiceImpl roleDao;


    @Autowired
    public AdminController(UserServiceImpl userService, RoleServiceImpl roleDao) {
        this.userService = userService;
        this.roleDao = roleDao;
    }

    @GetMapping("/admin/users")
    public String showAll(Model model, Principal principal) {
        model.addAttribute("users", userService.listUsers());
        User user = userService.findByUsername(principal.getName()).get();
        String username = user.getUsername();
        String password = user.getPassword();
        int id = user.getId();
        model.addAttribute("id", id);
        String roles = user.getRolesString();
        model.addAttribute("username", username);
        model.addAttribute("roles", roles);
        model.addAttribute("password", password);
        return "users";

    }
}
