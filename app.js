console.log("Let's predict some details!");

let userName = "";

const apiResultsSection = document.getElementById("apiResults");

async function getPredictions() {
  apiResultsSection.innerHTML = "";

  const predictionDiv = document.createElement("div");
  predictionDiv.classList = "result-div";

  const nameTitle = document.createElement("h2");
  nameTitle.textContent = `Predictions for "${userName}"`;
  nameTitle.classList = "result-title";
  predictionDiv.appendChild(nameTitle);

  const ageResult = await fetch(`https://api.agify.io/?name=${userName}`);
  const ageData = await ageResult.json();
  console.log(ageData);

  if (ageData.age !== null) {
    const agePredict = document.createElement("p");
    agePredict.textContent = `Predicted Age: ${ageData.age}`;
    predictionDiv.appendChild(agePredict);
  } else {
    const uniquePredict = document.createElement("p");
    uniquePredict.textContent = `This name is so unique, we don't have enough age data for it!`;
    predictionDiv.appendChild(uniquePredict);
  }

  const genderResult = await fetch(
    `https://api.genderize.io/?name=${userName}`
  );
  const genderData = await genderResult.json();
  console.log(genderData);

  if (genderData.gender !== null) {
    const genderPredict = document.createElement("p");
    genderPredict.textContent = `Predicted Gender: ${genderData.gender}`;
    predictionDiv.appendChild(genderPredict);
  } else {
    const uniquePredict = document.createElement("p");
    uniquePredict.textContent = `This name is so unique, we don't have enough gender data for it!`;
    predictionDiv.appendChild(uniquePredict);
  }

  const nationalityResult = await fetch(
    `https://api.nationalize.io/?name=${userName}`
  );
  const nationalityData = await nationalityResult.json();
  console.log(nationalityData);

  if (nationalityData.country.length > 0) {
    const topCountryId = nationalityData.country[0].country_id;

    const countryResult = await fetch(
      `https://restcountries.com/v3.1/alpha/${topCountryId}`
    );
    const countryData = await countryResult.json();
    console.log(countryData);

    const countryName = countryData[0].name.common;

    const countryPredict = document.createElement("p");
    countryPredict.textContent = `Predicted Country: ${countryName}`;
    predictionDiv.appendChild(countryPredict);
  } else {
    const uniquePredict = document.createElement("p");
    uniquePredict.textContent = `This name is so unique, we don't have enough country data for it!`;
    predictionDiv.appendChild(uniquePredict);
  }

  apiResultsSection.appendChild(predictionDiv);
}

const myApiForm = document.getElementById("apiForm");

myApiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted!");

  const formData = new FormData(myApiForm);
  const formDataObject = Object.fromEntries(formData);
  console.log(formDataObject);

  userName = formDataObject.userNameInput.trim();

  if (userName) {
    getPredictions();
  }
});
