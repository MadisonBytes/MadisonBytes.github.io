import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    { id: 'financial-dashboard', name: 'Financial Dashboard', description: 'Description for project one' },
    { id: '2', name: 'Project Two', description: 'Description for project two' },
    { id: '3', name: 'Project Three', description: 'Description for project three' }
  ];

  constructor(private router: Router) {}

  goToProject(id: string) {
    this.router.navigate(['/project', id]);
  }
}
