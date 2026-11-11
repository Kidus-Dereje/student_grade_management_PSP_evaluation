/**
 * Student Grade Management System
 * Adheres strictly to Requirements.md (REQ-01 through REQ-20)
 */

(function () {
  'use strict';

  // DOM Elements
  const slotsContainer = document.getElementById('slots-container');
  const addSlotBtn = document.getElementById('add-slot-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const calcHint = document.getElementById('calc-hint');
  const resultsPanel = document.getElementById('results-panel');
  const resultAverage = document.getElementById('result-average');
  const resultLetter = document.getElementById('result-letter');
  const resultGpa = document.getElementById('result-gpa');

  /**
   * Grading scale rules (Req 11 & 12)
   * Scale: A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60
   * 4.0 Points: A=4, B=3, C=2, D=1, F=0
   */
  function getLetterGrade(mark) {
    if (mark === '' || mark === null || isNaN(mark)) {
      return '';
    }
    const num = Number(mark);
    if (num >= 90) return 'A';
    if (num >= 80) return 'B';
    if (num >= 70) return 'C';
    if (num >= 60) return 'D';
    return 'F';
  }

  function getGradePoints(letterGrade) {
    switch (letterGrade) {
      case 'A': return 4.0;
      case 'B': return 3.0;
      case 'C': return 2.0;
      case 'D': return 1.0;
      case 'F': return 0.0;
      default: return 0.0;
    }
  }

  /**
   * Clears results panel to prevent showing stale results (Req 20)
   */
  function invalidateResults() {
    resultsPanel.hidden = true;
    resultAverage.textContent = '—';
    resultLetter.textContent = '—';
    resultGpa.textContent = '—';
    resultLetter.className = 'result-value grade-display';
  }

  /**
   * Evaluates completion of all slots to enable/disable Calculate button (Req 13 & 14)
   */
  function checkCompletion() {
    const inputs = slotsContainer.querySelectorAll('.slot-input');
    let allFilled = inputs.length > 0;

    inputs.forEach((input) => {
      const val = input.value.trim();
      if (val === '' || isNaN(Number(val))) {
        allFilled = false;
      }
    });

    calculateBtn.disabled = !allFilled;

    if (allFilled) {
      calcHint.textContent = 'All marks entered. Ready to calculate!';
      calcHint.style.color = '#15803d';
    } else {
      calcHint.textContent = 'Please fill in all subject marks to calculate.';
      calcHint.style.color = '';
    }
  }

  /**
   * Updates slot labels ("Subject 1", "Subject 2"...) and remove buttons (Req 5)
   * System keeps at least 1 slot, so the last one cannot be removed.
   */
  function updateSlotControls() {
    const rows = slotsContainer.querySelectorAll('.slot-row');
    const isSingleSlot = rows.length <= 1;

    rows.forEach((row, index) => {
      const label = row.querySelector('.slot-label');
      const input = row.querySelector('.slot-input');
      const removeBtn = row.querySelector('.remove-slot-btn');

      const subjectNum = index + 1;
      label.textContent = `Subject ${subjectNum}`;
      input.setAttribute('aria-label', `Mark for Subject ${subjectNum}`);

      // Disable remove button if only 1 slot remains
      removeBtn.disabled = isSingleSlot;
      if (isSingleSlot) {
        removeBtn.setAttribute('title', 'At least 1 subject slot is required');
      } else {
        removeBtn.setAttribute('title', `Remove Subject ${subjectNum}`);
      }
    });
  }

  /**
   * Enforces numeric input strictly between 0 and 100 (Req 6 & 7)
   */
  function sanitizeInput(input) {
    let val = input.value;
    if (val === '') return '';

    // Strip any invalid characters (keep digits and at most one decimal point)
    val = val.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }

    if (val !== '' && val !== '.') {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        if (num > 100) {
          val = '100';
        } else if (num < 0) {
          val = '0';
        }
      }
    }

    input.value = val;
    return val;
  }

  /**
   * Creates and appends a single mark slot element (Req 2, 3, 4, 8, 9, 10)
   */
  function createSlot() {
    const row = document.createElement('div');
    row.className = 'slot-row';
    row.setAttribute('role', 'listitem');

    const label = document.createElement('label');
    label.className = 'slot-label';
    label.textContent = 'Subject';

    const inputWrap = document.createElement('div');
    inputWrap.className = 'slot-input-wrap';

    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'slot-input';
    input.placeholder = '0–100';
    input.maxLength = 5; // e.g., "100" or "99.9"

    // Block disallowed keys on keydown (e, E, +, -, etc.)
    input.addEventListener('keydown', function (e) {
      if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
    });

    const badge = document.createElement('span');
    badge.className = 'grade-badge';
    badge.setAttribute('aria-label', 'Letter grade');
    badge.textContent = ''; // Blank while slot is empty (Req 10)

    // Real-time updates as user types (Req 8, 9, 10, 20)
    input.addEventListener('input', function () {
      sanitizeInput(input);
      const val = input.value.trim();

      if (val === '' || val === '.') {
        badge.textContent = '';
        badge.className = 'grade-badge';
      } else {
        const grade = getLetterGrade(Number(val));
        badge.textContent = grade;
        badge.className = `grade-badge grade-${grade}`;
      }

      invalidateResults();
      checkCompletion();
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-icon-danger remove-slot-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.setAttribute('aria-label', 'Remove subject slot');

    // Remove slot handling (Req 4 & 5)
    removeBtn.addEventListener('click', function () {
      const allRows = slotsContainer.querySelectorAll('.slot-row');
      if (allRows.length > 1) {
        row.remove();
        updateSlotControls();
        invalidateResults();
        checkCompletion();
      }
    });

    inputWrap.appendChild(input);
    row.appendChild(label);
    row.appendChild(inputWrap);
    row.appendChild(badge);
    row.appendChild(removeBtn);

    slotsContainer.appendChild(row);
    updateSlotControls();
    checkCompletion();
  }

  /**
   * Add button event listener (Req 3)
   */
  addSlotBtn.addEventListener('click', function () {
    createSlot();
    invalidateResults();
    checkCompletion();
  });

  /**
   * Calculate results (Req 15, 16, 17, 18)
   */
  calculateBtn.addEventListener('click', function () {
    const inputs = slotsContainer.querySelectorAll('.slot-input');
    const marks = [];

    for (let i = 0; i < inputs.length; i++) {
      const val = inputs[i].value.trim();
      if (val === '' || isNaN(Number(val))) {
        return; // Safety guard: do not calculate if any slot is invalid
      }
      marks.push(Number(val));
    }

    if (marks.length === 0) return;

    // 16. The average is the mean of all entered marks.
    const sumMarks = marks.reduce((acc, curr) => acc + curr, 0);
    const averageMark = sumMarks / marks.length;

    // 17. The GPA is the mean of the per-subject grade points.
    const gradePointsList = marks.map((m) => getGradePoints(getLetterGrade(m)));
    const sumPoints = gradePointsList.reduce((acc, curr) => acc + curr, 0);
    const gpa = sumPoints / gradePointsList.length;

    // 18. The overall letter grade is based on the average mark, using the scale in requirement 11.
    const overallLetter = getLetterGrade(averageMark);

    // 15. Pressing Calculate shows the average mark, the GPA, and the overall letter grade together.
    resultAverage.textContent = `${averageMark.toFixed(2)}%`;
    resultLetter.textContent = overallLetter;
    resultLetter.className = `result-value grade-display`;
    resultGpa.textContent = `${gpa.toFixed(2)}`;

    resultsPanel.hidden = false;
  });

  /**
   * Initialization on page load (Req 2)
   * On load or refresh, the page shows 4 empty mark input slots.
   */
  function init() {
    slotsContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      createSlot();
    }
    invalidateResults();
    checkCompletion();
  }

  // Run on page load
  init();
})();

