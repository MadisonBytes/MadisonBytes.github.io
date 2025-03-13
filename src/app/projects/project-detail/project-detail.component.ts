import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  protected projectId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
  }
}
