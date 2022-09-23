
const dom = {
    calendar: document.getElementById('calendar'),
    year: document.getElementById('year')
}

const year = new Date().getFullYear()
dom.year.innerHTML = year

function isVisokosny(year){
    if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)){
        return 1
    }
    return 0
}

const months = [
    {
        title: 'Futsal EURO 2022 <br> Final Tournament',
        name: 'January',
        days: 31,
    },
    {
        title: 'Club World<br>Championship',
        name: 'February',
        days: 28 +  isVisokosny(year),
    },
    {
        title: 'UEFA Womens Futsal<br>EURO 2022',
        name: 'March',
        days: 31,
    },
    {
        title: 'World Championship <br> Final Tournament Draw',
        name: 'April',
        days: 30,
    },
    {
        title: 'Champions League <br>FINAL',
        name: 'May',
        days: 31,
    },
    {
        title: 'Finalissima <br> Italy - Argentina',
        name: 'June',
        days: 30,
    },
    {
        title: 'UEFA Womens <br> EURO 2022',
        name: 'July',
        days: 31,
    },
    {
        title: 'UEFA <br> Super Cup ',
        name: 'August',
        days: 31,
    },
    {
        title: 'Champions League <br> Round 1',
        name: 'September',
        days: 30,
    },
    {
        title: 'UEFA EURO 2024 <br> Qualifying Drawr',
        name: 'October',
        days: 31,
    },
    {
        title: 'Champions League <br> Round Of 16 Draw',
        name: 'November',
        days: 30,
    },
    {
        title: 'Womens <br> Champions League',
        name: 'December',
        days: 31,
    }
]


function renderCalendar(year) {
    for(let i=0; i < 12; i++) {
        renderMonth(i, year)
    }
}
renderCalendar(year)

function renderMonth(monthIdx, year) {
    const month = months[monthIdx]
    const monthHeadString = buildMonthHead(month.title, month.name)
    const monthWeekDayNamesString = buildWeekDaysNames()
    const monthDates = buildDates(year, monthIdx, month.days)
    const monthBox = document.createElement('div')
    monthBox.className = 'month'
    const monthContentHTML = []

    monthContentHTML.push(monthHeadString)
    monthContentHTML.push(['<div class="month__content">'])
    monthContentHTML.push(monthWeekDayNamesString)
    monthContentHTML.push(monthDates)
    monthContentHTML.push('</div>')

    monthBox.innerHTML = monthContentHTML.join('')
    dom.calendar.appendChild(monthBox)

}

function buildMonthHead(title, monthName) {
    return `
    <div class="month__title">${title}</div>
    <div class="month__name">${monthName}</div>
    `
}



function buildWeekDaysNames() {
    let weekDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const daysNames = []
    for(let i=0; i < 7; i++){
        const dayNameTag = `<div class="month__date month__date_accent">${weekDayNames[i]}</div>`
        daysNames.push(dayNameTag)
    }
    return daysNames.join('')
}

function buildDates(year, month, daysCount) {
    const date = new Date(year, month, 1)
    const datesHTML = []
    const weekDayStart = date.getDay()
    let i = 0
    let day = 1
    while(day <= daysCount){
        let dateHTML;
        if(i < weekDayStart || weekDayStart == -1 && i < 7) {
            dateHTML = buildDate('')
            datesHTML.push(dateHTML)
            i++
        } else {
            dateHTML = buildDate(day)
            datesHTML.push(dateHTML)
            day++
        }
     
    }
    return datesHTML.join('')
} 

function buildDate(content, isAccent = false) {
    const cls = isAccent ? 'month__date month__date_accent' : 'month__date'
    return `<div class="${cls}">${content}</div>`
}

