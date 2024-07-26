import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,JsonPipe],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  
  taskForm: FormGroup = new FormGroup({
    taskEntry: new FormControl("",[Validators.required]),
    dateCompleted: new FormControl("",[Validators.required])
  })

  tasks: any[] = [];

  onSave() {
    if (this.taskForm.valid) {
      this.tasks.push(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  onDelete(index: number) {
    this.tasks.splice(index, 1);
  }
}

