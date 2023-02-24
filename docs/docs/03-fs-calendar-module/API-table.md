```typescript
import { FsCalendarModule } from "@fullstack-devops/ng-mat-components";
```

## References

- demo: https://fullstack-devops.github.io/ng-mat-components/calendar-table
- code example: https://github.com/fullstack-devops/ng-mat-components/tree/main/projects/lib-workspace/src/app/content/calendar-table

---

## Directives

```bash
.
└── fs-calendar-table
    └── fs-calendar-table-name
```

---

## Examples

### ui-frame in form

=== "HTML"

    ```html
    <section class="mat-elevation-z4">
      <fs-calendar-table [dataSource]="calTableData">
        <fs-calendar-table-name> Persons </fs-calendar-table-name>
      </fs-calendar-table>
    </section>
    ```

=== "TS"

    ``` typescript
    // ...
    import { CalendarTableEntry } from "@fullstack-devops/ng-mat-components";
    
    @Component({
      selector: "example",
      templateUrl: "example.html",
      styleUrls: ["example.css"],
    })
    export class ExampleComponent implements OnInit {
      // this can also be empty
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

=== "CSS"

    ``` css

    ```
