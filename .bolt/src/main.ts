import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RegistroComponent } from './registro.component';
import { ListadoComponent } from './listado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideRouter([
      { path: '', component: RegistroComponent },
      { path: 'listado', component: ListadoComponent }
    ])
  ]
});
