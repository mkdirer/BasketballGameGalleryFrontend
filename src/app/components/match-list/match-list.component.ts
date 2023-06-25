import { Match } from './../../models/match.model';
import { MatchService } from './../../service/modules_service/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matchs?: Match[];
  currentMatch: Match = {};
  currentIndex = -1;
  team = '';
  constructor(private matchService: MatchService) { }
  ngOnInit(): void {
    this.retrieveMatchs();
  }
  retrieveMatchs(): void {
    this.matchService.getAll()
      .subscribe({
        next: (data) => {
          this.matchs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
  refreshList(): void {
    this.retrieveMatchs();
    this.currentMatch = {};
    this.currentIndex = -1;
  }
  setActiveMatch(match: Match, index: number): void {
    this.currentMatch = match;
    this.currentIndex = index;
  }
  removeAllMatchs(): void {
    this.matchService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchteam(): void {
    this.currentMatch = {};
    this.currentIndex = -1;
    this.matchService.findByTeam(this.team)
      .subscribe({
        next: (data) => {
          this.matchs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
