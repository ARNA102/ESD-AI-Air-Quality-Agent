function getValue(id) {
  return Number(document.getElementById(id).value) || 0;
}

function predictRisk() {
  const pm25 = getValue('pm25');
  const pm10 = getValue('pm10');
  const co = getValue('co');
  const no2 = getValue('no2');
  const so2 = getValue('so2');
  const o3 = getValue('o3');
  const temp = getValue('temp');
  const humidity = getValue('humidity');

  let score = (pm25 * 1.35) + (pm10 * 0.45) + (co * 18) +
              (no2 * 0.55) + (so2 * 0.35) + (o3 * 0.25);

  if (temp > 35) score += 10;
  if (humidity > 75) score += 8;
  score = Math.round(score);

  let category = '';
  let cssClass = '';
  let advice = '';

  if (score <= 50) {
    category = 'Good';
    cssClass = 'good';
    advice = 'Air quality is satisfactory. Normal outdoor activity is safe.';
  } else if (score <= 100) {
    category = 'Moderate';
    cssClass = 'moderate';
    advice = 'Sensitive people should reduce long outdoor activity.';
  } else if (score <= 150) {
    category = 'Unhealthy for Sensitive Groups';
    cssClass = 'unhealthy';
    advice = 'Children, elderly people, and asthma patients should avoid heavy outdoor work.';
  } else if (score <= 200) {
    category = 'Unhealthy';
    cssClass = 'unhealthy';
    advice = 'Avoid prolonged outdoor activity. Use mask if going outside.';
  } else if (score <= 300) {
    category = 'Very Unhealthy';
    cssClass = 'very-unhealthy';
    advice = 'Stay indoors. People with breathing problems should take extra care.';
  } else {
    category = 'Hazardous';
    cssClass = 'hazardous';
    advice = 'Health emergency condition. Avoid outdoor exposure completely.';
  }

  document.getElementById('output').innerHTML =
    '<div class="output-box">' +
    '<p><strong>Estimated AQI Score:</strong> ' + score + '</p>' +
    '<p><strong>Predicted Health Risk:</strong> <span class="' + cssClass + '">' + category + '</span></p>' +
    '<p><strong>AI Agent Advice:</strong> ' + advice + '</p>' +
    '<p><strong>Suggested Action:</strong> Monitor air quality regularly and follow public health guidelines.</p>' +
    '</div>';
}
