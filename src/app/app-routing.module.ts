import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsJsonComponent} from "./components/forms-json/forms-json.component";
import {IndexComponent} from "./pages/index/index.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: FormsJsonComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
