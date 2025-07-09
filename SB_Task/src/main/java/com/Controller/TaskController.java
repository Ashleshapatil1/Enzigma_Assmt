package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.Task;
import com.Service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@Tag(name="Task", description="Task Operations Showing all Users, Add User , Update User, Edit Info, Delete Task")
public class TaskController {
	
	@Autowired
	TaskService ts;
	
	@PostMapping("/task")
	@Operation(summary ="Add Task", description =" In this method we Adding Task with their all info")
	public ResponseEntity<?> addTask(@RequestBody Task task) {
	    Task t = ts.addTaskInService(task);
	    if (t != null) {
	        return ResponseEntity.status(HttpStatus.CREATED).body("Task Added Successfully");
	    }
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add task");
	}

	@PutMapping("/task/{id}")
	@Operation(summary ="Update Task", description =" In this method we Update task Info")
	public ResponseEntity<?> updateTask( @RequestBody Task task) {
	    Task t = ts.updateTaskInService(task);  // make sure your service can handle id + task
	    if (t != null) {
	        return ResponseEntity.ok("Task Updated Successfully");
	    }
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
	}

	@DeleteMapping("/task/{user}")
	@Operation(summary ="Delete Task", description =" In this method we Delete Task")
	public ResponseEntity<?> deleteTask(@PathVariable("user") String user) {
	    boolean deleted = ts.deleteTaskInService(user);
	    if (deleted) {
	        return ResponseEntity.ok("Task Deleted Successfully");
	    }
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
	}

	@GetMapping("/tasks")
	@Operation(summary ="Get all tasks", description =" In this method we retriving all tasks")
	public ResponseEntity<?> getAllTasksData() {
	    List<Task> taskList = ts.getAllTasksDataFromService();
	    if (!taskList.isEmpty()) {
	        return ResponseEntity.ok(taskList);
	    }
	    return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks found");
	}


}
