import { Player } from './../../models/player.model';
import { PlayerService } from './../../service/modules_service/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players?: Player[];
  currentPlayer: Player = {};
  currentIndex = -1;
  name = '';
  team = '';
  constructor(private playerService: PlayerService) { }
  ngOnInit(): void {
    this.retrievePlayers();
  }
  retrievePlayers(): void {
    this.playerService.getAll()
      .subscribe({
        next: (data) => {
          this.players = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
  refreshList(): void {
    this.retrievePlayers();
    this.currentPlayer = {};
    this.currentIndex = -1;
  }
  setActivePlayer(player: Player, index: number): void {
    this.currentPlayer = player;
    this.currentIndex = index;
  }
  removeAllPlayers(): void {
    this.playerService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchlastName(): void {
    this.currentPlayer = {};
    this.currentIndex = -1;
    this.playerService.findBylastName(this.name)
      .subscribe({
        next: (data) => {
          this.players = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  searchteam(): void {
    this.currentPlayer = {};
    this.currentIndex = -1;
    this.playerService.findByTeam(this.team)
      .subscribe({
        next: (data) => {
          this.players = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
