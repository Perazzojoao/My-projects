package com.firstproject.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firstproject.demo.entity.User;
import com.firstproject.demo.service.HelloWorldService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/hello")
public class HelloWorldController {
  @Autowired
  private HelloWorldService helloWorldService;

  @GetMapping
  public String firstPage() {
    return helloWorldService.getHelloWorld(" João");
  }

  @PostMapping("/{id}")
  public String helloWorldPost(@PathVariable("id") String id, @RequestBody User user) {

    return "Hello World " + user.getName() + id;
  }

}
