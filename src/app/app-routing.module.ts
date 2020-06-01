import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XmlToDataComponent } from './xml-to-data/xml-to-data.component';


const routes: Routes = [
  { path: '', component: XmlToDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
