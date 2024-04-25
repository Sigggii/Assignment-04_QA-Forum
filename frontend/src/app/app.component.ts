import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
