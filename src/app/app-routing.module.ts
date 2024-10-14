import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSearchModule } from './screens/main-search/main-search.module';
import { ResultSearchModule } from './screens/result-search/result-search.module';

const routes: Routes = [
  {
    path: '', loadChildren: () => MainSearchModule
  },
  {
    path: 'result', loadChildren: () => ResultSearchModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
