
export const SideNav = [
  {
    icon: 'line-chart',
    title: $localize`Dashboard`,
    label: $localize`Dashboard`,
    path: 'dashboard',
    subMenu: null
  },
  {
    icon: 'calculator',
    title: $localize`Workbench`,
    label: $localize`Workbench`,
    path: null,
    subMenu: [
      {
        title: $localize`Genesis`,
        label: `${$localize`Workbench`} ${$localize`Genesis`}`,
        path: null,
        menuItem : [
          {
            title: $localize`Projects`,
            label: `${$localize`Workbench`} ${$localize`Genesis`} ${$localize`Projects`}`,
            path: 'workbench/genesis/projects',
          },
          {
            title: $localize`Studio`,
            label: `${$localize`Workbench`} ${$localize`Genesis`} ${$localize`Studio`}`,
            path: 'workbench/genesis/studio',
          }
        ]
      }
    ]
  },
  {
    icon: 'team',
    title: $localize`Admin`,
    path: null,
    label: $localize`Admin`,
    subMenu: [
      {
        title: $localize`Genesis`,
        label: `${$localize`Admin`} ${$localize`Genesis`}`,
        path: null,
        menuItem : [
          {
            title: $localize`Projects`,
            label: `${$localize`Admin`} ${$localize`Genesis`} ${$localize`Projects`}`,
            path: 'admin/genesis/projects',
          },
          {
            title: $localize`Studio`,
            label: `${$localize`Admin`} ${$localize`Genesis`} ${$localize`Studio`}`,
            path: 'admin/genesis/studio',
          }
        ]
      }
    ]
  }
];
