import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-site',
  templateUrl: './to-site.page.html',
  styleUrls: ['./to-site.page.scss'],
})
export class ToSitePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
