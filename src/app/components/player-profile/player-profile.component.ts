import { PlayerService } from './../../service/modules_service/player.service';
import { Player } from './../../models/player.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentPlayer: Player = {
    firstName: '',
    lastName: '',
    age: 0,
    team: ''
  };

  message = '';
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPlayer(this.route.snapshot.params["id"]);
    }
  }
  getPlayer(id: string): void {
    this.playerService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPlayer = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePlayer(): void {
    this.message = '';
    this.playerService.update(this.currentPlayer.id, this.currentPlayer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : "The player's data has been successfully updated!";
        },
        error: (e) => console.error(e)
      });
  }
  deletePlayer(): void {
    this.playerService.delete(this.currentPlayer.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/players']);
        },
        error: (e) => console.error(e)
      });
  }

}
