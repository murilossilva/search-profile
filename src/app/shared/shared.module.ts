import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterComponent } from './components/filter/filter.component';

const baseModules = [
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule,
  FontAwesomeModule
]

const sharedModules = [
  LoadingComponent,
  ErrorAlertComponent,
  FilterComponent
]

@NgModule({
  imports: [
    ...baseModules
  ],
  exports: [
    ...baseModules,
    ...sharedModules
  ],
  declarations: [
    ...sharedModules
  ]
})
export class SharedModule { }
