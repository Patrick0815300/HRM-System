import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menuItems = [
    { icon: 'dashboard', title: 'Dashboard', link: '/' },
    { icon: 'today', title: 'Urlaub & Arbeitszeiten', subItems: ['Urlaubsantrag', 'Arbeitszeiten'], open: false, link: '/timeDasboard' },
    { icon: 'group', title: 'Mitarbeiter & Kommunikation', subItems: ['Mitarbeiterverwaltung', 'Nachrichten'], open: false, link: '/employeesDashboard' },
    { icon: 'school', title: 'Schulung & Weiterentwicklung', subItems: ['Schulungsangebote', 'Zertifikate'], open: false, link: '/trainingDasboard' },
    { icon: 'settings', title: 'Einstellungen & Dokumente', subItems: ['Benutzereinstellungen', 'Dokumentenverwaltung'], open: false, link: '/settingsDashboard' },
  ];

  activeIndex: number = 0;

  toggleList(index: number) {
    const isAlreadyOpen = this.menuItems[index].open;
    this.menuItems.forEach((element, i) => {
      if (i !== index) {
        element.open = false;
      }
    });
    this.menuItems[index].open = !isAlreadyOpen;
    if (this.menuItems[index].open) {
      this.activeIndex = index;
    }
  }

  closeAllMenus() {
    this.menuItems.forEach(item => item.open = false);
  }

}
