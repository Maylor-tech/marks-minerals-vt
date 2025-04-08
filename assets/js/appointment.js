document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    let selectedDate = null;
    let selectedTime = null;

    // DOM Elements
    const form = document.getElementById('appointment-form');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const nextBtns = document.querySelectorAll('.btn-next');
    const calendarDays = document.getElementById('calendar-days');
    const timeSlots = document.getElementById('time-slots');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // Calendar variables
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Initialize calendar
    function initCalendar() {
        updateCalendarHeader();
        renderCalendar();
        generateTimeSlots();
    }

    // Update calendar header
    function updateCalendarHeader() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = `${months[currentMonth]} ${currentYear}`;
    }

    // Render calendar days
    function renderCalendar() {
        calendarDays.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty cells for days before first of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= lastDate; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            // Disable past dates
            const date = new Date(currentYear, currentMonth, day);
            if (date < new Date().setHours(0,0,0,0)) {
                dayEl.classList.add('disabled');
            } else {
                dayEl.addEventListener('click', () => selectDate(date, dayEl));
            }

            calendarDays.appendChild(dayEl);
        }
    }

    // Generate time slots
    function generateTimeSlots() {
        timeSlots.innerHTML = '';
        const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
        
        slots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.addEventListener('click', () => selectTimeSlot(time, slot));
            timeSlots.appendChild(slot);
        });
    }

    // Select date handler
    function selectDate(date, element) {
        const allDays = document.querySelectorAll('.calendar-day');
        allDays.forEach(day => day.classList.remove('selected'));
        element.classList.add('selected');
        selectedDate = date;
        updateSummary();
    }

    // Select time slot handler
    function selectTimeSlot(time, element) {
        const allSlots = document.querySelectorAll('.time-slot');
        allSlots.forEach(slot => slot.classList.remove('selected'));
        element.classList.add('selected');
        selectedTime = time;
        updateSummary();
    }

    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        initCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        initCalendar();
    });

    // Form navigation
    function updateFormSteps() {
        steps.forEach(step => step.classList.remove('active'));
        steps[currentStep - 1].classList.add('active');

        progressSteps.forEach((step, idx) => {
            if (idx < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    // Validation
    function validateStep(step) {
        switch(step) {
            case 1:
                return selectedDate && selectedTime;
            case 2:
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                return name && email && phone;
            default:
                return true;
        }
    }

    // Update summary
    function updateSummary() {
        if (selectedDate && selectedTime) {
            document.getElementById('summary-date').textContent = selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('summary-time').textContent = selectedTime;
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (document.getElementById('terms').checked) {
            const formData = {
                date: selectedDate,
                time: selectedTime,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interests: Array.from(document.getElementById('interests').selectedOptions).map(option => option.value),
                notes: document.getElementById('notes').value
            };

            // Update success message
            document.getElementById('success-date').textContent = formData.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('success-time').textContent = formData.time;

            // Hide form and show success message
            document.querySelector('.appointment-form-container').style.display = 'none';
            document.getElementById('appointment-success').style.display = 'block';

            // In a real application, you would send formData to your server here
            console.log('Form submitted:', formData);
        }
    });

    // Initialize the calendar
    initCalendar();
}); 