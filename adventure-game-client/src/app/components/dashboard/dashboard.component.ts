import { Component, OnInit } from '@angular/core';
import { DataloaderService } from '../../services/data/dataloader.service';
import { Adventure } from 'src/app/models/adventure';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  adventures: Adventure[];

  constructor(public dataLoadSvc: DataloaderService, public router: Router) { }

  ngOnInit(): void {
    this.getAdventures();
  }

  getAdventures(): void {
    this.dataLoadSvc.getAdventures().subscribe(adventures => this.adventures = adventures);
  }

  loadAdventure(adventure: Adventure): void {
    this.router.navigate([`/game/${adventure.name}`]);
  }

}
