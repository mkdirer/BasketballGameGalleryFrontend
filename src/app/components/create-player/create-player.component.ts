import { Player } from './../../models/player.model';
import { PlayerService } from './../../service/modules_service/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  player: Player = {
    firstName: '',
    lastName: '',
    age: 0,
    team: ''
  };
  submitted = false;
  constructor(private playerService: PlayerService) { }
  ngOnInit(): void {
  }
  savePlayer(): void {
    const data = {
      firstName: this.player.firstName,
      lastName: this.player.lastName,
      age: this.player.age,
      team: this.player.team
    };
    this.playerService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newPlayer(): void {
    this.submitted = false;
    this.player = {
      firstName: '',
      lastName: '',
      age: 0,
      team: ''
    };
  }

}
