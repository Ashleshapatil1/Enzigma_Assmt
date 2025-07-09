package com.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.Task;
import com.Repositeries.TaskRepo;

@Service
public class ServiceImpl implements TaskService{
	
	@Autowired
	TaskRepo tr;

	@Override
	public Task addTaskInService(Task task) {
		System.out.println(task);
		Task t = tr.save(task);
		System.out.println(t);
		return t;
	}

	@Override
	public List<Task> getAllTasksDataFromService() {
		List<Task> testList = tr.findAll();
		return testList;
	}

	@Override
	public Task updateTaskInService( Task task) {
		Task t1 = new Task();
		if(task != null) {
			if(task.getUser() != null ) {
				t1.setUser(task.getUser());
			}
			if(task.getStatus() != null ) {
				t1.setStatus(task.getStatus());
			}
			if(task.getDate() != null ) {
				t1.setDate(task.getDate());
			}
			if(task.getPriority() != null ) {
				t1.setPriority(task.getPriority());
			}
			if(task.getComments() != null ) {
				t1.setComments(task.getComments());
			}
		}
		Task t = tr.save(task);
		return t;
	}

	@Override
	public boolean deleteTaskInService(String user) {
		List<Task> t = tr.findAll();
		System.out.println(t);
		for (Task task : t) {
			if(task != null && user.equalsIgnoreCase(task.getUser())) {
				 tr.delete(task);
				 List<Task> t2 = tr.findAll();
					System.out.println(t2);
				 return true;
			 }
		}
		return false;
	}

}
