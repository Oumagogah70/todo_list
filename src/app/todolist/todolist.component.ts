import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({
    taskEntry: new FormControl("", [Validators.required]),
    dateCompleted: new FormControl("", [Validators.required])
  });

  tasks: any[] = [];
  submitted = false;

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  onSave() {
    this.submitted = true;
    if (this.taskForm.valid) {
      this.tasks.push(this.taskForm.value);
      this.saveTasksToLocalStorage();
      this.taskForm.reset();
      this.submitted = false;
    }
  }

  onDelete(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
