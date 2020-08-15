const welcomeMessage = document.querySelector('.welcome-message');
const launchButton = document.querySelector('.launch-button');
const formSection = document.querySelector('.forms-wrapper');
const formButton = document.querySelector('.form-button');
const hint = document.querySelector('.continue-info');
const spinner = document.querySelector('.spin');
const addMore = document.querySelector('.seperator>span')

const launch = _ => {
  hint.classList.add('hide');
  welcomeMessage.classList.add('hide');
  launchButton.classList.add('hide');
  spinner.classList.add('show');
  setTimeout (showEstimator, Math.random() * 30);
}

const showEstimator = _ => {
  formSection.classList.remove('hide');
  formButton.classList.remove('hide');
  spinner.classList.remove('show')
}

const addRow = _ => {
  const tr = document.querySelectorAll('tr').length
  document.querySelector('tbody').innerHTML  += `
  <tr data-no="${tr}">
    <td class="align-center">${tr}</td>
    <td class="align-center"><input required data-course class="course" type="text"></td>
    <td class="align-center">
      <select name="grade" id="" required>
        <option value="--" disabled selected>--</option>
        <option value="4.0">A</option>
        <option value="3.5">AB</option>
        <option value="3.25">B</option>
        <option value="3.0">BC</option>
        <option value="2.75">C</option>
        <option value="2.5">CD</option>
        <option value="2.25">D</option>
        <option value="2.00">E</option>
        <option value="0">F</option>
      </select>
    </td>
    <td class="align-center"><input required data-unit class="unit" type="number" min="0" max="7"></td>
    <td class="align-center">
      <div style="font-weight: bold; color: royalblue">del</div>
    </td>
  </tr>
  `
}

const calculateGPA = _ => {
  const courses = document.querySelectorAll('tr');
  const gps = document.querySelector('.gpa');

  let unit = [];
  let gradePoint = [];
  let totalGradePoint = [];
  let gpa = 0;
  for(let i = 1; i < courses.length; i++) {
    let unitVal = +courses[i].children[3].children[0].value
    let gpVal = +courses[i].children[2].children[0].value
    unit.push(unitVal);
    gradePoint.push(gpVal);
    totalGradePoint.push(unitVal * gpVal);
  };

  gpa = totalGradePoint.reduce(reducer) / unit.reduce(reducer);
  
  document.querySelector('#gpa').textContent = gpa;
  console.log(gps.classList)
  gps.classList.remove('hide');
  gps.classList.add('show');
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;


addMore.addEventListener('click', addRow); 
launchButton.addEventListener('click', launch); 
formButton.addEventListener('click', calculateGPA); 