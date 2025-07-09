package com.Entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Task {
	
	@Id
	private String user;
	
	private String status;
	
	private LocalDate date;
	
	private String priority;
	
	private String comments;

}
