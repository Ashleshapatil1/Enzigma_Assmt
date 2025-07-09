package com.Service;

import java.util.List;

import com.Entity.Task;

public interface TaskService {

	Task addTaskInService(Task task);

	List<Task> getAllTasksDataFromService();

	Task updateTaskInService( Task task);

	boolean deleteTaskInService(String user);

}
