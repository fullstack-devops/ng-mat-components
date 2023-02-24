```typescript
import { FsCalendarModule } from "@fullstack-devops/ng-mat-components";
```

## References

- demo: https://fullstack-devops.github.io/ng-mat-components/calendar-panels
- code example:
  [app.component.html](https://github.com/fullstack-devops/ng-mat-components/blob/main/projects/lib-workspace/src/app/app.component.html)
  [app.component.ts](https://github.com/fullstack-devops/ng-mat-components/blob/main/projects/lib-workspace/src/app/app.component.ts)

---

## Directives

```bash
.
└── fs-calendar-panels
```

---

## Examples

### minimal

=== "HTML"

    ```html
    <div style="height: 80%">
      <fs-calendar-panels
        [placeholderDay]="placeholder"
        [dataSource]="dataSource"
        [year]="todayYear"
        [month]="todayMonth"
        [monthsBefore]="monthsBefore"
        [monthsAfter]="monthsAfter"
        (selection)="testMethod($event)"
      >
      </fs-calendar-panels>
    </div>
    ```

=== "TS"

    ``` typescript
    // ...
    import {
      CalendarEvent,
      CalendarPanels,
    } from "@fullstack-devops/ng-mat-components";
    
    @Component({
      selector: "example",
      templateUrl: "example.html",
      styleUrls: ["example.css"],
    })
    export class ExampleComponent implements OnInit {
      // this cannot be empty
      dataSource: CalendarPanels = {
        config: {
          renderMode: "monthly", // 'annual' | 'monthly'
          selectMode: "range", // 'click' | 'range'
          displayYear: true,
          firstDayOfWeekMonday: true,
          calendarWeek: true,
          switches: true,
          panelWidth: "300px",
          bluredDays: false, // default: false
          markWeekend: true, // default: true
        },
        data: [],
      };
    
      constructor() {}
    
      ngOnInit() {}
    
      testMethod(event: CalendarEvent) {
        switch (event.type) {
          case "range":
            this.range = event;
            break;
          case "click":
            this.range = event;
            break;
        }
        console.log(event);
      }
    }
    ```

=== "CSS"

    ``` css

    ```
