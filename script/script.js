const welcomeMessage = document.querySelector('.welcome-message');
const launchButton = document.querySelector('.launch-button');
const formSection = document.querySelector('.forms-wrapper');
const formButton = document.querySelector('.form-button');

const launch = _ => {
  formSection.classList.remove('hide');
  formButton.classList.remove('hide');
  welcomeMessage.classList.add('hide');
  launchButton.classList.add('hide');
}

const normalizedDays = (periodType, periodCount) => {
  let days;
  switch (periodType) {
    case 'days':
      days = periodCount;
      break;
    case 'weeks':
      days = periodCount * 7;
      break;
    case 'months':
      days = periodCount * 30;
      break;
    default:
      break;
  }
  return days;
};

const ci = (reportedCases, severe = false) => {
  const calc = !severe ? reportedCases * 10 : reportedCases * 50;
  return calc;
};

const ibrt = (currentlyInfected, days) => currentlyInfected * (2 ** Math.trunc(days / 3));

const scbrt = (infected) => Math.trunc(infected * 0.15);

const hbbrt = (thb, { severeCasesByRequestedTime }) => {
  const calc = Math.trunc((thb * 0.35) - severeCasesByRequestedTime);
  return calc;
};

const cfibrt = ({ infectionsByRequestedTime }) => Math.trunc(infectionsByRequestedTime * 0.05);

const cfvbrt = ({ infectionsByRequestedTime }) => Math.trunc(infectionsByRequestedTime * 0.02);

const dif = ({ infectionsByRequestedTime },
  { avgDailyIncomeInUSD, avgDailyIncomePopulation },
  days) => {
  const impact = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
  const avgImpact = Math.trunc(impact / days);
  return avgImpact;
};

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const days = normalizedDays(data.periodType, data.timeToElapse);

  impact.currentlyInfected = ci(data.reportedCases);
  severeImpact.currentlyInfected = ci(data.reportedCases, true);

  impact.infectionsByRequestedTime = ibrt(impact.currentlyInfected, days);
  severeImpact.infectionsByRequestedTime = ibrt(severeImpact.currentlyInfected, days);

  impact.severeCasesByRequestedTime = scbrt(impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = scbrt(severeImpact.infectionsByRequestedTime);

  impact.hospitalBedsByRequestedTime = hbbrt(data.totalHospitalBeds, impact);
  severeImpact.hospitalBedsByRequestedTime = hbbrt(data.totalHospitalBeds, severeImpact);

  impact.casesForICUByRequestedTime = cfibrt(impact);
  severeImpact.casesForICUByRequestedTime = cfibrt(severeImpact);

  impact.casesForVentilatorsByRequestedTime = cfvbrt(impact);
  severeImpact.casesForVentilatorsByRequestedTime = cfvbrt(severeImpact);

  impact.dollarsInFlight = dif(impact, data.region, days);
  severeImpact.dollarsInFlight = dif(severeImpact, data.region, days);

  return { data, impact, severeImpact };
};


launchButton.addEventListener('click', launch); 
formButton.addEventListener('click', covid19ImpactEstimator); 