import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerticalFieldComponent } from './wrappers/vertical';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FieldFileComponent } from './types/file-type';
import { FieldSelectableComponent } from './types/select-type';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormlyFieldButton } from './types/button-type.component';

@NgModule({
  declarations: [
    VerticalFieldComponent,
    FieldFileComponent,
    FieldSelectableComponent,
    FormlyFieldButton
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    IonicSelectableModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'vertical', component: VerticalFieldComponent }],
      types: [
        { name: 'file', component: FieldFileComponent, wrappers: ['vertical'] },
        { name: 'button', component: FormlyFieldButton, wrappers: ['vertical'] },
        { name: 'selectable', component: FieldSelectableComponent, wrappers: ['vertical'] }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ]
    })
  ],
  exports: [
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule
  ]
})
export class NahFormlyModule { }
