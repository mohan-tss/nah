import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { AppRouterNavigateService } from 'src/app/utils/app-router-navigate.service';
import { NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss'],
})
export class AgendaListComponent implements OnInit {
  agendaList = [];
  constructor(private http: AppHttpClient, public appNav: AppRouterNavigateService) { }
  searchKey: any;
  cloneAgendaList = [];
  ngOnInit() {
    this.http.get('agenda').subscribe(res => {
      if (res.data) {
        this.agendaList = res.data;
        this.cloneAgendaList = res.data;
      }
    });
  }
  topicDetails(topic) {
    console.log('topic details -->', topic);
  }
  searchFilter(event) {
    this.searchKey = event.target.value;
    // this.getGroups();
    const data = this.cloneAgendaList.filter(item => {
      let isItem = false;
      item.topics.forEach(topic => {
        const result = (topic.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1);
        if (result) {
          isItem = true;
        }
      });
      if (isItem) {
        return item;
      }
    });
    this.agendaList = data;
    // if (!this.searchKey) {
    //   this.agendaList = this.cloneAgendaList;
    // }
  }

}
