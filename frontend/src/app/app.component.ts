import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CheckboxModule} from "primeng/checkbox";
import {Button, ButtonModule} from "primeng/button"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheckboxModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
