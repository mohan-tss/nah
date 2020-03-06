import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AppHttpClient } from 'src/app/utils';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { GroupCreateModalComponent } from 'src/app/group-create-modal/group-create-modal.component';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.scss'],
})
export class MeetingCreateComponent implements OnInit {
  title = 'Create A Meeting';
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [{
    key: 'title',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Meeting Title',
      placeholder: 'Enter Meeting Title',
      required: true,
    }
  },
  {
    key: 'agenda',
    type: 'textarea',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      required: true,
      maxLength: 1000,
      label: 'Meeting Information (Max size 1000 characters)',
      placeholder: 'Enter Meeting Information',
    }
  },
  {
    key: 'contactInfo',
    type: 'textarea',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      required: true,
      maxLength: 1000,
      label: 'Contact Information (Max size 1000 characters)',
      placeholder: 'Enter Contact Information',
      description: 'Max size 1000 characters'
    }
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'groupId',
        type: 'selectable',
        wrappers: ['vertical'],
        className: 'col-6 pr-0',
        templateOptions: {
          label: 'Group',
          placeholder: 'Select Group',
          required: true,
          itemValueField: 'value',
          itemTextField: 'label',
          options: []
        }
      },
      {
        type: 'button',
        className: 'col-6 ion-text-right ion-padding-t-10 ion-margin-t-3',
        templateOptions: {
          label: '',
          text: 'Add Group',
          class: 'ion-color ion-color-danger',
          btnType: 'info',
          type: 'button',
          onClick: ($event) => {
            // this.form.get('someInput').setValue('clicked!');
            this.openGroupModel();
          },
          description: 'These can have labels and stuff too if you want....',
        },
      }
    ]
  },

  {
    key: 'cityId',
    type: 'selectable',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'City',
      placeholder: 'Select City',
      required: true,
      itemValueField: 'id',
      itemTextField: 'name',
      options: []
    }
  },
  {
    key: 'location',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Location',
      placeholder: 'Enter Location',
      required: true,
    }
  },

  {
    key: 'image',
    type: 'file',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      multiple: false,
      required: false,
      label: 'Image',
      placeholder: 'Upload Image',
    }
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'meetingDate',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'Start Date',
          min: this.getCurrentDateString(null),
          placeholder: 'Choose Date',
        }
      },
      {
        key: 'endDate',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'End Date',
          placeholder: 'Choose Date',
        },
        expressionProperties: {
          'templateOptions.min': (model) => {
            return this.getCurrentDateString(model.meetingDate);
          }
        }
      },
      {
        key: 'startTime',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'Start Time',
          placeholder: 'Choose Time',
          displayFormat: 'hh mm A',
          pickerFormat: 'hh mm A'
        }
      },
      {
        key: 'endTime',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'End Time',
          placeholder: 'Choose Time',
          displayFormat: 'hh mm A',
          pickerFormat: 'hh mm A'
        }
      }
    ],
  }
  ];
  groupList = [];
  constructor(private http: AppHttpClient,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    this.getCities();
    this.http.get('group/list/' + userInfo.id).subscribe(res => {
      console.log(res);
      if (res.data) {
        this.groupList = res.data.map(item => {
          const group = {
            label: 'Say No To ' + item.name,
            value: item.id
          };
          return group;
        })
      }
      this.fields[3].fieldGroup[0].templateOptions.options = this.groupList || [];
    });
  }
  getCities() {
    this.http.get('city/list').subscribe(res => {
      if (res.data) {
        const cityList = res.data.map(item => {
          const city = {
            label: item.name,
            value: item.id
          };
          return city;
        });
        this.fields[4].templateOptions.options = res.data || [];//cityList;
      }

    });
  }


  async submit(model, isPublish) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    if (isPublish) {
      model.isPublished = 1;
    } else {
      model.isPublished = 0;
    }
    const userInfo = this.authService.getUserInfo();
    console.log('this.userInfo', userInfo);
    const formData = new FormData();
    // formData.append('file', model.image);
    model.createdBy = userInfo.id;
    for (let key in model) {
      formData.append(key, model[key]);
    }
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };
    this.http.post('meeting', formData).subscribe(res => {
      console.log('res', res);
      this.router.navigate(['/dashboard'], { queryParams: { reload: true } });
      // window.location.reload();
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async openGroupModel() {
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: 'group-create-modal'
    });
    modal.onDidDismiss().then(arg => {
      // this.getGroups();
      console.log('arg', this.model);

      if (arg.data) {
        const group = {
          label: arg.data.name,
          value: arg.data.id
        }
        this.groupList.push(group);
        this.form.controls.groupId.setValue(arg.data.id);
      }
      // this.groupC.ngOnInit();
    });
    return await modal.present();
  }
  getCurrentDateString(_date?:Date) {
    let date = new Date();
    if (_date) {
      console.log('__date',_date,new Date(_date));
      date = new Date(_date);
    }
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
  getMaxDateString() {
    const date = new Date();
    return (date.getFullYear() + 2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
}
