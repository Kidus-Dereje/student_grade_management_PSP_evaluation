# Requirements (22 units)

## 1. Input

1. The system is a single-page web app for one student, with no login.
2. On load or refresh, the page shows 4 empty mark input slots.
3. The user can add a mark slot with an "Add" control.
4. The user can remove a mark slot with a "Remove" control.
5. The system keeps at least 1 slot, so the last one cannot be removed.
6. Each slot accepts only numeric input.
7. Each slot only accepts values from 0 to 100, and the input field prevents anything else from being entered.

## 2. Live Feedback

8. As the user types a mark, the letter grade for that subject appears to the right of the input.
9. The live letter grade updates instantly when the mark changes.
10. The live letter grade is blank while the slot is empty.

## 3. Grading Rules

11. Letter grades follow this scale: A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60.
12. Each letter grade maps to grade points on the 4.0 scale: A=4, B=3, C=2, D=1, F=0.

### Grading Reference Table

| Letter Grade | Mark Range | Grade Points (4.0 Scale) |
| :---: | :---: | :---: |
| **A** | ≥ 90 | 4 |
| **B** | ≥ 80 and < 90 | 3 |
| **C** | ≥ 70 and < 80 | 2 |
| **D** | ≥ 60 and < 70 | 1 |
| **F** | < 60 | 0 |

## 4. Calculation and Output

13. The Calculate button is disabled until every slot has a value.
14. The Calculate button is enabled once every slot is filled.
15. Pressing Calculate shows the average mark, the GPA, and the overall letter grade together.
16. The average is the mean of all entered marks.
17. The GPA is the mean of the per-subject grade points.
18. The overall letter grade is based on the average mark, using the scale in requirement 11.

## 5. Data and State

19. No data is stored, and refreshing the page resets everything to the initial state.
20. Changing a mark after calculating either updates or clears the displayed results, so stale results are never shown.

## Out of Scope (Assumptions, Not Counted as Units)

- No credit hours, so all subjects are weighted equally.
- No saving, login, multiple students, or file export.

## Tech Stack

- HTML
- CSS
- JavaScript
