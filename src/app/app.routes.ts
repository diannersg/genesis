import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import(`./dashboard/dashboard.component`).then(m => m.DashboardComponent),
    data: {
      breadcrumb: $localize`Dashboard`
    }
  },
  {
    path: 'workbench',
    data: {
      breadcrumb: $localize`Workbench`
    },
    children: [
      {
        path: 'genesis',
        data: {
          breadcrumb: $localize`Genesis`
        },
        children: [
          {
            path: 'projects',
            data: {
              breadcrumb: $localize`Projects`,
            },
            children: [
              {
                path: 'development',
                loadComponent: () => import(`./projects/projects.component`).then(m => m.ProjectsComponent),
                data: {
                  breadcrumb: $localize`Model Development`,
                  type: 'workbench',
                  tab: 'development'
                },
              },
              {
                path: 'validation',
                loadComponent: () => import(`./projects/projects.component`).then(m => m.ProjectsComponent),
                data: {
                  breadcrumb: $localize`Model Validation`,
                  type: 'workbench',
                  tab: 'validation'
                },
              },
              {
                path: '**',
                redirectTo: 'development'
              }
            ]
          },
          {
            path: 'studio',
            loadComponent: () => import(`./studio/studio.component`).then(m => m.StudioComponent),
            data: {
              breadcrumb: $localize`Studio`
            },
          },
          {
            path: '**',
            redirectTo: 'projects/development'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'genesis'
      }
    ]
  },
  {
    path: 'admin',
    data: {
      breadcrumb: $localize`Admin`
    },
    children: [
      {
        path: 'genesis',
        data: {
          breadcrumb: $localize`Genesis`
        },
        children: [
          {
            path: 'projects',
            loadComponent: () => import(`./projects/projects.component`).then(m => m.ProjectsComponent),
            data: {
              breadcrumb: $localize`Projects`,
              type: 'admin',
            },
          },
          {
            path: 'studio',
            loadComponent: () => import(`./studio/studio.component`).then(m => m.StudioComponent),
            data: {
              breadcrumb: $localize`Studio`
            },
          },
          {
            path: '**',
            redirectTo: 'projects'
          }
        ],
      },
      {
        path: '**',
        redirectTo: 'genesis'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
