import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";
import {NzIconDirective, NzIconService} from "ng-zorro-antd/icon";
import {SideNav} from "./side.nav";
import {IconsConfig} from "./shared/icons/icons.config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzHeaderComponent, NzLayoutComponent, NzIconDirective, NzSiderComponent, NzBreadCrumbComponent, NzContentComponent, NzMenuDirective, NzSubMenuComponent, NzMenuItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isCollapsed = false;

  constructor(
    private iconService: NzIconService,
  ) {
    IconsConfig.forEach(icon => {
      this.iconService.addIcon(icon)
    })
  }

  protected readonly SideNav = SideNav;
}
