import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Api } from './api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('fitness-app');
  private api = inject(Api);

  healthData: any = null;
  norseData: any = null;

  ngOnInit() {
    this.api.getHealth().subscribe((data) => {
      this.healthData = data;
    });
    this.api.getNorseTest().subscribe((data) => {
      this.norseData = data;
    });
  }
}
