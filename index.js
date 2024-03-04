const refs = {
  inputFile: document.querySelector(".file-input"),
  result: document.querySelector(".result"),
  loader: document.querySelector(".loader"),
};

const calculateMedian = (arr) => {
  const length = arr.length;
  if (length % 2 === 0) {
    const middleIndex = length / 2;
    const median = (arr[middleIndex - 1] + arr[middleIndex]) / 2;
    return median.toFixed(1);
  } else {
    var middleIndex = Math.floor(length / 2);
    return arr[middleIndex];
  }
};

const calculateAverage = (arr) => {
  const sum = arr.reduce((num, acc) => acc + num, 0);
  return (sum / arr.length).toFixed(1);
};

const increasingSequence = (array) => {
  let longestSequence = [];
  let currentSequence = [];

  array.forEach((num, index) => {
    if (index === 0 || num > array[index - 1]) {
      currentSequence.push(num);
    } else {
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence;
      }
      currentSequence = [num];
    }
  });

  return currentSequence.length > longestSequence.length
    ? currentSequence
    : longestSequence;
};

const decreasingSequence = (array) => {
  let longestSequence = [];
  let currentSequence = [];

  array.forEach((num, index) => {
    if (index === 0 || num < array[index - 1]) {
      currentSequence.push(num);
    } else {
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence;
      }
      currentSequence = [num];
    }
  });

  return currentSequence.length > longestSequence.length
    ? currentSequence
    : longestSequence;
};

refs.inputFile.addEventListener("change", ({ target }) => {
  const file = target.files[0];
  const reader = new FileReader();
  refs.result.innerHTML = "";

  if (!file.name.includes(".txt"))
    return (refs.result.innerHTML = `<p class="text-danger fs-3 text fw-bolder">Wrong file extension</p>`);
  if (file["size"] === 0)
    return (refs.result.innerHTML = `<p class="text-danger fs-3 text fw-bolder">File is empty</p>`);

  refs.loader.classList.add("loading");

  reader.readAsText(file);

  reader.onload = function (e) {
    const contents = e.target.result;
    const numbersArray = contents.split("\n").map((num) => Number(num));
    if (!numbersArray.every((num) => Number(num) === num)) {
      refs.result.innerHTML = `<p class="text-danger fs-3 text fw-bolder">There are other characters in the file besides numbers</p>`;
      refs.loader.classList.remove("loading");
      return;
    }

    const sortedArray = [...numbersArray].sort((a, b) => a - b);

    const res = ` 
                  <p>Max Number => ${sortedArray[sortedArray.length - 1]}</p>
                  <p>Min Number => ${sortedArray[0]}</p>
                  <p>Median => ${calculateMedian(numbersArray)}</p>
                  <p>Average => ${calculateAverage(numbersArray)}</p>
                  <p>Increasing Sequence => ${increasingSequence(
                    numbersArray
                  )}</p>
                  <p>Decreasing Sequence => ${decreasingSequence(
                    numbersArray
                  )}</p> 
                  `;

    refs.result.innerHTML = res;
    refs.loader.classList.remove("loading");
  };
});
