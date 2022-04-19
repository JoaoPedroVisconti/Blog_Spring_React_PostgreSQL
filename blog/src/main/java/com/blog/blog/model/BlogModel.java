package com.blog.blog.model;

import javax.persistence.*;

@Entity
@Table(name="blogs")
public class BlogModel {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name="title")
  private String title;
  
  @Column(name="description")
  private String description;
  
  @Column(name="published")
  private boolean published;


  public BlogModel() {

  }

  public BlogModel(String title, String description, boolean published) {
    this.title = title;
    this.description = description;
    this.published = published;
  }
  

  public long getId() {
    return this.id;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isPublished() {
    return this.published;
  }

  public void setPublished(boolean published) {
    this.published = published;
  }

  @Override
  public String toString(){
    return "Tutorial [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + "]";
  }
  
}
