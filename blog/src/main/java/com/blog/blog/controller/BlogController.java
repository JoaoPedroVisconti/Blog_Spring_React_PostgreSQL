package com.blog.blog.controller;

import java.util.List;


import com.blog.blog.model.BlogModel;
import com.blog.blog.service.BlogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class BlogController {

  private final BlogService blogService;

  @Autowired
  public BlogController(BlogService blogService) {
    this.blogService = blogService;
  }

  @GetMapping("/blogs")
  public ResponseEntity<List<BlogModel>> getAllBlogs(@RequestParam(required = false) String title) {
      return blogService.getAllBlogs(title);
  }
  
  @GetMapping("/blogs/{id}")
  public ResponseEntity<BlogModel> getBlogById(@PathVariable("id") long id) {
    return blogService.getBlogById(id);
  }

  @PostMapping("/blogs")
  public ResponseEntity<BlogModel> createBlog(@RequestBody BlogModel blog) {
    return blogService.createBlog(blog);
  }

  @PutMapping("/blogs/{id}")
  public ResponseEntity<BlogModel> updateBlog(@PathVariable("id") long id, @RequestBody BlogModel blog) {
    return blogService.updateBlog(id, blog);
  }

  @DeleteMapping("/blogs/{id}")
  public ResponseEntity<HttpStatus> deleteBlog(@PathVariable("id") long id) {
    return blogService.deleteBlog(id);
  }

  @DeleteMapping("/blogs")
  public ResponseEntity<HttpStatus> deleteAllBlogs() {
    return blogService.deleteAllBlogs();
  }

  @GetMapping("/blogs/published")
  public ResponseEntity<List<BlogModel>> findByPublished() {
    return blogService.findByPublished();
  }
}
