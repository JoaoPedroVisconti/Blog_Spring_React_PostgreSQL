package com.blog.blog.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.blog.blog.model.BlogModel;
import com.blog.blog.repository.BlogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BlogService {
  private final BlogRepository blogRepository;

  @Autowired
  public BlogService(BlogRepository blogRepository) {
    this.blogRepository = blogRepository;
  }

  public ResponseEntity<List<BlogModel>> getAllBlogs(String title) {
    
    try {
      List<BlogModel> blogs = new ArrayList<BlogModel>();
      
      if (title == null) {
        blogRepository.findAll().forEach(blogs::add);
      
      } else {
        System.out.println(title);
        blogRepository.findByTitleContaining(title).forEach(blogs::add);
        System.out.println(blogs);
      }
      
        if (blogs.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      
      return new ResponseEntity<>(blogs, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<BlogModel> getBlogById(long id) {
    Optional<BlogModel> blogData = blogRepository.findById(id);

    if(blogData.isPresent()) {
      return new ResponseEntity<>(blogData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  public ResponseEntity<BlogModel> createBlog(BlogModel blog) {
    try {
      BlogModel _blog = blogRepository.save(new BlogModel(
        blog.getTitle(), blog.getDescription(), false
      ));

      return new ResponseEntity<>(_blog, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<BlogModel> updateBlog(long id, BlogModel blog) {
    Optional<BlogModel> blogData = blogRepository.findById(id);

    if(blogData.isPresent()) {
      BlogModel _blog = blogData.get();

      _blog.setTitle(blog.getTitle());
      _blog.setDescription(blog.getDescription());
      _blog.setPublished(blog.isPublished());

      return new ResponseEntity<>(blogRepository.save(_blog), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  public ResponseEntity<HttpStatus> deleteBlog(long id) {
    try {
      blogRepository.deleteById(id);

      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<HttpStatus> deleteAllBlogs() {
    try {
      blogRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<List<BlogModel>> findByPublished() {
    try {
      List<BlogModel> blogs = blogRepository.findByPublished(true);

      if(blogs.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(blogs, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
