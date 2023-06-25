import { Match } from './../../models/match.model';
import { MatchService } from './../../service/modules_service/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  match: Match = {
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
  submitted = false;
  constructor(private matchService: MatchService) { }
  ngOnInit(): void {
  }
  saveMatch(): void {
    const data = {
      date: this.match.date,
      result: this.match.result,
      homeTeam: this.match.homeTeam,
      visitTeam: this.match.visitTeam,
      visitPointGuard: this.match.visitPointGuard,
      visitShootingGuard: this.match.visitShootingGuard,
      visitSmallForward: this.match.visitSmallForward,
      visitPowerForward: this.match.visitPowerForward,
      visitCenter: this.match.visitCenter,
      homePointGuard: this.match.homePointGuard,
      homeShootingGuard: this.match.homeShootingGuard,
      homeSmallForward: this.match.homeSmallForward,
      homePowerForward: this.match.homePowerForward,
      homeCenter: this.match.homeCenter
    };
    this.matchService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newMatch(): void {
    this.submitted = false;
    this.match = {
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
  }

}
