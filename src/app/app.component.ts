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
  keycloakMenuItems: MenuItem[];
  apiMenuItms: MenuItem[];
  otherComponentMenuItems: MenuItem[];

  chartItems: MenuItem[];

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
        icon: 'security',
        title: 'Oauth2',
        subTitle: 'Login with oauth2',
        url: ['login', 'oauth2']
      },
      {
        icon: 'facebook',
        title: 'Facebook',
        subTitle: 'Login with Facebook',
        url: ['login', 'facebook']
      },
      {
        icon: 'google',
        title: 'Google',
        subTitle: 'Login with Google',
        url: ['login', 'google']
      },
      {
        icon: 'person_add',
        title: 'Sign Up',
        subTitle: 'Sing Up wiht Keycloack',
        url: ['login', 'sign-up']
      },
      {
        icon: 'person',
        title: 'Profile',
        subTitle: 'Simple Profile',
        url: ['login', 'profile']
      }
    ];

    this.keycloakMenuItems = [
      {
        icon: 'security',
        title: 'Keycloak Oauth2',
        subTitle: 'Wrapper arround the oauth2',
        url: ['login', 'keycloak-oauth2']
      },
      {
        icon: 'people',
        title: 'Keycloak Users',
        subTitle: 'Get keycloak users',
        url: ['login', 'keycloak-users']
      },
      {
        icon: 'person_add',
        title: 'Keycloak Sign Up',
        subTitle: 'Register new Keycloak user',
        url: ['login', 'keycloak-register']
      }
    ];

    this.apiMenuItms = [
      {
        icon: 'brightness_auto',
        title: 'Api Browser',
        subTitle: 'HATEOS API Browser',
        url: ['apis', 'root']
      },
      {
        icon: 'brightness_auto',
        title: 'Api Select',
        subTitle: 'HATEOS API Selector',
        url: ['apis', 'selector']
      },
      {
        icon: 'brightness_auto',
        title: 'Api Image',
        subTitle: 'Show Images',
        url: ['apis', 'image']
      }
    ];

    this.otherComponentMenuItems = [
      {
        icon: 'date_range',
        title: 'Calendar',
        subTitle: 'Material Calendar',
        url: ['calendar']
      },
      {
        icon: 'layers',
        title: 'Openlayer',
        subTitle: 'Openlayer',
        url: ['openlayer']
      }
    ];

    this.chartItems = [
      {
        icon: 'highchart',
        title: 'Highchart',
        subTitle: 'Highcgart Component',
        url: ['chart']
      },
      {
        icon: 'heatmap',
        title: 'Heat Map',
        subTitle: 'Heat Map component',
        url: ['heat-map']
      }
    ];
  } // constructor()
}
