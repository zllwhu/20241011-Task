package org.example.heritagebackend.controller;

import org.example.heritagebackend.common.Result;
import org.example.heritagebackend.exception.CustomException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {
    @GetMapping("/hello")
    public Result hello() {
//        throw new CustomException("400", "错误，禁止请求！");
        return Result.success("Hello World");
    }
}
