# Student Grade Management System

> **School Process Improvement Project**  
> A lightweight, client-side web application designed to eliminate calculation errors, provide instant per-subject grading feedback, and automate GPA and average mark computation.

---

## 1. Overview

The **Student Grade Management System** is a single-page web application (SPA) built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**. It is specifically tailored for a single student to record marks across variable subjects without requiring logins, database configurations, or server overhead.

### Key Objectives & Improvements
- **Instant Feedback**: Letter grades update in real time as marks are typed.
- **Strict Input Validation**: Prevents invalid values by strictly accepting numbers from `0` to `100`.
- **Dynamic Adaptability**: Allows adding and removing subject slots while enforcing a minimum of 1 slot.
- **Data Integrity & Staleness Prevention**: Automatically invalidates and clears calculation results whenever inputs change to ensure stale figures are never presented.
- **Ephemeral State**: Operates entirely in browser memory; reloading the page returns the application to its clean initial state with zero leftover cookies or local storage.

---

## 2. Core Features

| Feature | Description | Requirement |
| :--- | :--- | :--- |
| **Initial State** | Automatically renders 4 empty subject input slots on initial load or page refresh. | REQ-02 |
| **Dynamic Slots** | Add new subject slots with the **Add Subject** button; delete slots with individual **Remove** buttons. | REQ-03, REQ-04 |
| **Slot Boundary Guard** | The system retains at least 1 slot; the final remove button is automatically disabled. | REQ-05 |
| **Input Sanitization** | Restricts input strictly to numeric values between `0` and `100` (clamps values > 100). | REQ-06, REQ-07 |
| **Live Letter Grade** | Renders color-coded letter grades adjacent to the input field in real time. Stays blank when empty. | REQ-08, REQ-09, REQ-10 |
| **Conditional Calculate** | The **Calculate Results** button is enabled strictly when all active slots contain valid marks. | REQ-13, REQ-14 |
| **Unified Results Dashboard** | Computes and displays Average Mark, Cumulative GPA (4.0 scale), and Overall Letter Grade simultaneously. | REQ-15, REQ-16, REQ-17, REQ-18 |
| **Staleness Invalidation** | Modifying any mark or modifying the slot count instantly hides calculation results. | REQ-20 |

---

## 3. Grading & GPA Reference Scale

The application applies an unweighted scale across all subjects:

| Letter Grade | Mark Range | 4.0 Scale Grade Point | Condition |
| :---: | :---: | :---: | :--- |
| **A** | $90 - 100$ | **4.0** | $\ge 90$ |
| **B** | $80 - 89.99$ | **3.0** | $\ge 80 \text{ and } < 90$ |
| **C** | $70 - 79.99$ | **2.0** | $\ge 70 \text{ and } < 80$ |
| **D** | $60 - 69.99$ | **1.0** | $\ge 60 \text{ and } < 70$ |
| **F** | $0 - 59.99$ | **0.0** | $< 60$ |

### Computation Formulas

- **Average Mark**:
  $$\text{Average} = \frac{\sum_{i=1}^{n} \text{mark}_i}{n}$$
- **Cumulative GPA**:
  $$\text{GPA} = \frac{\sum_{i=1}^{n} \text{points}_i}{n}$$
- **Overall Letter Grade**: Determined by matching the calculated **Average Mark** against the scale above.

---

## 4. Quickstart & Usage

The application requires no build tools or package managers.

### Option 1: Direct File Opening
1. Navigate to the project directory:
   ```bash
   cd "/home/kdd/Work/School Projects/Process Improvement Student Grade Management System"
   ```
2. Open `index.html` directly in any modern browser (e.g., Chrome, Firefox, Safari, Edge):
   ```bash
   xdg-open index.html
   ```

### Option 2: Local Static Server (Optional)
To run with a lightweight local web server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 5. Project Structure & Documentation

```
Process Improvement Student Grade Management System/
├── index.html          # Semantic HTML5 document & user interface
├── style.css           # Modern CSS3 stylesheet (responsive layout & grade badges)
├── script.js           # Reactive ES6+ application engine & calculation logic
├── Requirements.md     # Functional requirements specification (20 units)
├── Design.md           # System design document, wireframes, & data flow
├── Testing.md          # Comprehensive Test Plan & Verification Report (100% pass)
└── README.md           # Project documentation & user guide
```

### Documentation Index
- **[Requirements.md](Requirements.md)**: Baseline functional requirements covering inputs, live feedback, grading logic, outputs, and scope assumptions.
- **[Design.md](Design.md)**: Complete system design including UI wireframe, state model, Mermaid flowcharts, and requirement traceability.
- **[Testing.md](Testing.md)**: Test plan documenting 22 test cases and the automated verification suite run with headless Chromium.

---

## 6. Verification & Quality Assurance

All requirements have been validated using automated browser tests:
- **Total Test Cases**: 22
- **Passing**: 22 (100%)
- **Failing**: 0

To run the automated test suite locally:
```bash
deno run -A "/home/kdd/.gemini/antigravity/brain/f170351b-8f63-4f28-8e5a-056019e2821b/scratch/test_runner.js"
```

