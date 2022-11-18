# API reference for Ui Frame

```javascript
import { FsUiFrameModule } from "@fullstack-devops/ng-mat-components";
```

## html

```html
<fs-ui-frame
  [frameConfig]="frameConfig"
  [navUser]="navUser"
  [appRoutes]="appRoutes"
  (event)="onEvent($event)"
>
  <fs-ui-frame-toolbar>
    <fs-ui-frame-toolbar-title>Current App Title</fs-ui-frame-toolbar-title>

    <fs-ui-frame-toolbar-center>
      <button mat-icon-button>
        <mat-icon>help</mat-icon>
      </button>
      <button mat-icon-button matBadge="3">
        <mat-icon>article</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>call</mat-icon>
      </button>
    </fs-ui-frame-toolbar-center>

    <fs-ui-frame-toolbar-side>
      <!-- <a>Test the side</a> -->
      <mat-form-field appearance="outline">
        <input matInput placeholder="Search" type="search" />
        <!-- <mat-icon matSuffix>close</mat-icon> -->
      </mat-form-field>
    </fs-ui-frame-toolbar-side>
  </fs-ui-frame-toolbar>

  <fs-ui-frame-content>
    <router-outlet></router-outlet>
  </fs-ui-frame-content>
</fs-ui-frame>
```

## ts

```typescript
// ...
import {
  FrameConfig,
  FrameEvent,
  FrameEvents,
  NavUser,
} from "@fullstack-devops/ng-mat-components";
import { routes } from "./app-routing.module";

@Component({
  selector: "example",
  templateUrl: "example.html",
  styleUrls: ["example.css"],
})
export class ExampleComponent implements OnInit {
  title = "FS DevOps`s ng mat components";
  appRoutes = routes;

  frameConfig: FrameConfig = {
    appName: "Dummy App",
    // appNameShort: stringOfLength('DUMMY', 0, 6),
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png",
  };
  navUser: NavUser = {
    profilePicture:
      "https://material.angular.io/assets/img/examples/shiba1.jpg",
    name: "Some User",
    role: "Engineer",
  };

  ngOnInit() {}

  onEvent(frameEvent: FrameEvent) {
    switch (frameEvent.type) {
      case FrameEvents.MANAGE_ACCOUNT:
        console.log("Manage Account called, do something...");
        break;
      case FrameEvents.LOGOUT:
        console.log("Logout called, do something...");
        break;
      default:
        console.error(`unknown event fetched: ${JSON.stringify(event)}`);
        break;
    }
  }
}
```
