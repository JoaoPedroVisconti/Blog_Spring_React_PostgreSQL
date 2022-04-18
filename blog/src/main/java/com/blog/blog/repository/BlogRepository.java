package com.blog.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.blog.blog.model.BlogModel;

public interface BlogRepository extends JpaRepository<BlogModel, Long> {
  List<BlogModel> findByPublished(boolean published);
  List<BlogModel> findByTitleContaining(String title);
}
