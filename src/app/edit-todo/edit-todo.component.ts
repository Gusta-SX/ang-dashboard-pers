import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  todo: Todo

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')
      this.todo = this.todoService.getTodo(idParam)
    })
  }

  onFormSubmit(form: NgForm) {
    this.todoService.updateTodo(this.todo.id, form.value)
    this.router.navigateByUrl("/todos")
    this.notificationService.show('Tarefa Atualizada')

  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id)
    this.router.navigateByUrl("/todos")
    this.notificationService.show('Tarefa Excluída')

  }

}
