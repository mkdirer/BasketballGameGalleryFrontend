import { UserService } from './../../service/main_service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  content?: string;
  constructor(private userService: UserService) { }
  ngOnInit(): void {

  }
}
