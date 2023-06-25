import { MatchService } from './../../service/modules_service/match.service';
import { Match } from './../../models/match.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.css']
})
export class MatchProfileComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentMatch: Match = {
    date: '',
    result: '',
    homeTeam: '',
    visitTeam: '',
    visitPointGuard: '',
    visitShootingGuard: '',
    visitSmallForward: '',
    visitPowerForward: '',
    visitCenter: '',
    homePointGuard: '',
    homeShootingGuard: '',
    homeSmallForward: '',
    homePowerForward: '',
    homeCenter: ''
  };

  // positions = [
  //   { name: 'PG', colspan: 1, rowspan: 1, color: 'lightblue' },
  //   { name: 'SG', colspan: 1, rowspan: 1, color: 'lightgreen' },
  //   { name: 'SF', colspan: 1, rowspan: 2, color: 'lightyellow' },
  //   { name: 'PF', colspan: 1, rowspan: 2, color: 'lightpink' },
  //   { name: 'C', colspan: 1, rowspan: 2, color: 'lightgray' }
  // ];

  message = '';
  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMatch(this.route.snapshot.params["id"]);
    }
  }

  //   getVisitingPlayers(): any[] {
  //   return [
  //     { position: 'PG', name: this.currentMatch.visitPointGuard },
  //     { position: 'SG', name: this.currentMatch.visitShootingGuard },
  //     { position: 'SF', name: this.currentMatch.visitSmallForward },
  //     { position: 'PF', name: this.currentMatch.visitPowerForward },
  //     { position: 'C', name: this.currentMatch.visitCenter }
  //   ];
  // }

  // getHomePlayers(): any[] {
  //   return [
  //     { position: 'PG', name: this.currentMatch.homePointGuard },
  //     { position: 'SG', name: this.currentMatch.homeShootingGuard },
  //     { position: 'SF', name: this.currentMatch.homeSmallForward },
  //     { position: 'PF', name: this.currentMatch.homePowerForward },
  //     { position: 'C', name: this.currentMatch.homeCenter }
  //   ];
  // }

  // getTileColor(position: string): string {
  //   const player = this.positions.find(p => p.name === position);
  //   return player ? player.color : '';
  // }

  getMatch(id: string): void {
    this.matchService.get(id)
      .subscribe({
        next: (data) => {
          this.currentMatch = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateMatch(): void {
    this.message = '';
    this.matchService.update(this.currentMatch.id, this.currentMatch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Mecz został pomyślnie zaktualizowany!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteMatch(): void {
    this.matchService.delete(this.currentMatch.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/matches']);
        },
        error: (e) => console.error(e)
      });
  }

}

