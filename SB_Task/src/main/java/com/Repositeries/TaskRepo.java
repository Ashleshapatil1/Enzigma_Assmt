package com.Repositeries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Task;
@Repository
public interface TaskRepo extends JpaRepository<Task, Integer>{

}
