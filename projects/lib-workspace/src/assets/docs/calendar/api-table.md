# API reference for Calendar Panels

```javascript
import { FsCalendarModule } from "@fullstack-devops/ng-mat-components";
```

## Html

```html
<section class="mat-elevation-z4">
  <fs-calendar-table [dataSource]="calTableData">
    <fs-calendar-table-name> Persons </fs-calendar-table-name>
  </fs-calendar-table>
</section>
```

## Ts

```typescript
import { CalendarTableEntry } from "@fullstack-devops/ng-mat-components";

@Component({
  selector: "example",
  templateUrl: "example.html",
  styleUrls: ["example.css"],
})
export class ExampleComponent implements OnInit {
  calTableData: CalendarTableEntry[] = [
    {
      name: "Test User",
      data: [
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 20),
          toolTip: "Some longer text",
          char: "",
          colors: {
            backgroundColor: "#FFFFFF",
            color: "#000",
          },
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
```
