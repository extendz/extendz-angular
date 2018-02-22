import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { MenuItem } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Extendz';
  pagesMenuItems: MenuItem[];
  authenticationMenuItems: MenuItem[];
  apiMenuItms: MenuItem[];
  otherComponentMenuItems: MenuItem[];

  constructor(
    public media: ObservableMedia,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconSetInNamespace(
      'app',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/icons.svg')
    );
    this.pagesMenuItems = [
      {
        icon: 'home',
        title: 'Home',
        subTitle: 'Home Page',
        url: ['']
      },
      {
        icon: 'pages',
        title: 'Docs',
        subTitle: 'Documentation',
        url: ['docs']
      }
    ];

    this.authenticationMenuItems = [
      {
        icon: 'oauth2',
        title: 'Oauth2',
        subTitle: 'Login with oauth2',
        url: ['login', 'oauth2']
      },
      {
        icon: 'facebook',
        title: 'Facebook',
        subTitle: 'Login with Facebook',
        url: ['login', 'facebook']
      }
      // {
      //   icon: 'google',
      //   title: 'Google',
      //   subTitle: 'Login with Google',
      //   url: ['login', 'google']
      // },
      // {
      //   icon: 'keycloak',
      //   title: 'Keycloak Oauth2',
      //   subTitle: 'Wrapper arround the oauth2',
      //   url: ['login', 'keycloak-oauth2']
      // },
      // {
      //   icon: 'keycloak',
      //   title: 'Keycloak Users',
      //   subTitle: 'Get keycloak users',
      //   url: ['login', 'keycloak-users']
      // },
      // {
      //   icon: 'keycloak',
      //   title: 'Keycloak Sign Up',
      //   subTitle: 'Register new Keycloak user',
      //   url: ['login', 'keycloak-register']
      // }
    ];

    this.apiMenuItms = [
      {
        icon: 'api',
        title: 'Api Browser',
        subTitle: 'HATEOS API Browser',
        url: ['apis', 'root']
      },
      {
        icon: 'api',
        title: 'Api Select',
        subTitle: 'HATEOS API Selector',
        url: ['apis', 'selector']
      }
    ];

    this.otherComponentMenuItems = [
      {
        icon: 'map',
        title: 'Google Map',
        subTitle: 'Google Map',
        url: ['map']
      },
      {
        icon: 'date_range',
        title: 'Calendar',
        subTitle: 'Material Calendar',
        url: ['calendar']
      },
      {
        icon: 'openlayer',
        title: 'Openlayer',
        subTitle: 'Openlayer',
        url: ['openlayer']
      }
    ];
  } // constructor()
}
