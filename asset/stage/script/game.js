const { stageplayer, usernameplayer } = getParametersFromURL();
//=================================================================================================
//     STAGE 1
//=================================================================================================
// Decimal numbers for conversion
const decimalNumbers = [0.2, 0.5, 0.6, 2.8, 1.9];

// Correct answers
const correctAnswers = ['1/5', '1/2', '3/5', '2 4/5', '1 9/10'];

// Function to generate quiz questions
function generateQuiz() {
    const quizContainer = document.getElementById('quiz-container');

    decimalNumbers.forEach((decimal, index) => {
        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <label for="answer${index}" class="text-lg text-white font-medium">${index + 1}. ${decimal} = </label>
            <input type="text" id="answer${index}" class="bg-gray-700 border text-white border-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
        `;
        quizContainer.appendChild(question);
    });
}
// Function to check answers and update database
function checkAnswers() {
    let correctCount = 0;
    let stage1pts = 0;
    let stage1max = 0;

    decimalNumbers.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value.trim();

        // Compare user's answer with correct answer
        if (userAnswer === correctAnswers[index]) {
            correctCount++;
        }
    });

    // Calculate points and max for Stage 1
    stage1pts = correctCount * 100; // Assuming each correct answer gives 100 points
    stage1max = decimalNumbers.length * 100; // Assuming each question is worth 100 points

    // Update Firebase database
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function (currentCoin) {
        return (currentCoin || 0) + 300;
    });

    // Display result in modal
    if (correctCount === decimalNumbers.length) {
        displayResult(`You got a perfect score! 500 coins added to your account.`);
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (150 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function (currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        displayResult(`You got ${correctCount} out of ${decimalNumbers.length} correct. You received a reward of ${randomReward} coins!`);
    }
}

// Function to display result in modal
function displayResult(message) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.textContent = message;
    modal.classList.remove('hidden');
}




//=================================================================================================
//     STAGE 2
//=================================================================================================

    // Decimal numbers for Stage 2
    const decimalNumbersStage2 = [0.25, 0.72, 0.33, 0.75, 1.45, 0.18, 4.67, 0.94, 0.56, 2.88];

    // Correct answers for Stage 2
    const correctAnswersStage2 = ['1/4', '18/25', '33/100', '3/4', '1 9/20', '9/50', '4 67/100', '47/50', '14/25', '2 22/25'];

    // Function to generate quiz questions for Stage 2
    function generateQuizStage2() {
        const quizContainerStage2 = document.getElementById('quiz-container-stage2');

        decimalNumbersStage2.forEach((decimal, index) => {
            const question = document.createElement('div');
            question.className = 'mb-4';
            question.innerHTML = `
                <label for="answerStage2${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal} = </label>
                <input type="text" id="answerStage2${index}" class="border border-white bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
            `;
            quizContainerStage2.appendChild(question);
        });
    }

    // Function to check answers for Stage 2
    function checkAnswersStage2() {
        let correctCountStage2 = 0;
        let stage2pts = 0;
        let stage2max = 0;

        decimalNumbersStage2.forEach((decimal, index) => {
            const userAnswer = document.getElementById(`answerStage2${index}`).value.trim();
            
            // Compare user's answer with correct answer
            if (userAnswer === correctAnswersStage2[index]) {
                correctCountStage2++;
            }
        });

        // Calculate points and max for Stage 2
        stage2pts = correctCountStage2 * 100; // Assuming each correct answer gives 100 points
        stage2max = decimalNumbersStage2.length * 100; // Assuming each question is worth 100 points

        // Update Firebase database
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.update({
            "stage2pts": stage2pts,
            "stage2max": stage2max,
        });

        // Add 500 coins to the existing amount
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + 600;
        });

        displayResultStage2(correctCountStage2);
    }

    // Function to display result in modal for Stage 2
    function displayResultStage2(correctCountStage2) {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');

        // Check if the user got a perfect score
        if (correctCountStage2 === decimalNumbersStage2.length) {
            modalContent.textContent = `You got a perfect score! 600 coins added to your account.`;
        } else {
            // Generate a random reward between 100 and 200 coins
            const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
            // Add the random reward to the existing amount
            const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
            playerInfoRef.child("coin").transaction(function(currentCoin) {
                return (currentCoin || 0) + randomReward;
            });

            modalContent.textContent = `You got ${correctCountStage2} out of ${decimalNumbersStage2.length} correct. You received a reward of ${randomReward} coins!`;
        }

        modal.classList.remove('hidden');
    }
//=================================================================================================
//     STAGE 3
//=================================================================================================
 // Decimal numbers for Stage 3
 const decimalNumbersStage3 = [0.333, 0.125, 0.275, 0.225, 1.375, 0.675, 0.546, 0.063, 0.825, 2.125, 0.945, 0.123, 1.234, 3.375, 0.375];

 // Correct answers for Stage 3
 const correctAnswersStage3 = [
     '333/1000', '1/8', '11/40', '9/40', '1 3/8', '27/40', '273/500', '63/1000', '33/40', '2 1/8',
     '189/200', '123/1000', '1 117/500', '3 3/8', '3/8'
 ];

 // Function to shuffle an array randomly
 function shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
     }
 }

 // Function to generate quiz questions for Stage 3
 function generateQuizStage3() {
     const quizContainerStage3 = document.getElementById('quiz-container-stage3');

     decimalNumbersStage3.forEach((decimal, index) => {
         const options = correctAnswersStage3.slice(); // Copy the correct answers
         const correctAnswer = options[index]; // Get the correct answer
         shuffleArray(options); // Shuffle the options

         const question = document.createElement('div');
         question.className = 'mb-4';
         question.innerHTML = `
             <label for="answerStage3${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal}</label>
             <select id="answerStage3${index}" class="border border-white bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                 <option value="" disabled selected>Select Fraction</option>
                 ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
             </select>
             <span class="hidden" id="correctAnswerStage3${index}">${correctAnswer}</span>
         `;
         quizContainerStage3.appendChild(question);
     });
 }
// Function to check answers for Stage 3
function checkAnswersStage3() {
    let correctCountStage3 = 0;
    let stage3pts = 0;
    let stage3max = 0;

    decimalNumbersStage3.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage3${index}`).value.trim();
        const correctAnswer = document.getElementById(`correctAnswerStage3${index}`).textContent.trim();

        // Compare user's answer with correct answer
        if (userAnswer === correctAnswer) {
            correctCountStage3++;
        }
    });

    // Calculate points and max for Stage 3
    stage3pts = correctCountStage3 * 100; // Assuming each correct answer gives 100 points
    stage3max = decimalNumbersStage3.length * 100; // Assuming each question is worth 100 points

    // Update Firebase database
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    playerInfoRef.update({
        "stage3pts": stage3pts,
        "stage3max": stage3max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 900;
    });

    displayResultStage3(correctCountStage3);
}

// Function to display result in modal for Stage 3
function displayResultStage3(correctCountStage3) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage3 === decimalNumbersStage3.length) {
        modalContent.textContent = `You got a perfect score! 900 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage3} out of ${decimalNumbersStage3.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}


   
//=================================================================================================
//     STAGE 4
//=================================================================================================

  // Decimal numbers for Stage 4
  const decimalNumbersStage4 = [0.2564, 0.4520, 1.3878, 3.5683, 0.6212, 0.1352, 2.7245, 0.8314, 0.1072, 1.9982, 0.7615, 0.1225, 0.5725, 0.3456, 0.7432];

  // Correct answers for Stage 4
  const correctAnswersStage4 = [
      '241/2500', '113/250', '1 1939/5000', '3 5683/10000', '1552/2500', '169/1250', '2 1449/2000', '4157/5000', '67/625',
      '1 4491/5000', '1523/2000', '49/400', '229/400', '216/625', '929/1250'
  ];

  // Function to shuffle an array randomly
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // Function to generate quiz questions for Stage 4
  function generateQuizStage4() {
      const quizContainerStage4 = document.getElementById('quiz-container-stage4');

      decimalNumbersStage4.forEach((decimal, index) => {
          const options = correctAnswersStage4.slice(); // Copy the correct answers
          const correctAnswer = options[index]; // Get the correct answer
          shuffleArray(options); // Shuffle the options

          const question = document.createElement('div');
          question.className = 'mb-4';
          question.innerHTML = `
              <label for="answerStage4${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal}</label>
              <select id="answerStage4${index}" class="border border-white bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="" disabled selected>Select Fraction</option>
                  ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
              </select>
              <span class="hidden" id="correctAnswerStage4${index}">${correctAnswer}</span>
          `;
          quizContainerStage4.appendChild(question);
      });
  }

  // Function to check answers for Stage 4
function checkAnswersStage4() {
    let correctCountStage4 = 0;
    let stage4pts = 0;
    let stage4max = 0;

    decimalNumbersStage4.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage4${index}`).value.trim();
        const correctAnswer = document.getElementById(`correctAnswerStage4${index}`).textContent.trim();

        // Compare user's answer with correct answer
        if (userAnswer === correctAnswer) {
            correctCountStage4++;
        }
    });

    // Calculate points and max for Stage 4
    stage4pts = correctCountStage4 * 100; // Assuming each correct answer gives 100 points
    stage4max = decimalNumbersStage4.length * 100; // Assuming each question is worth 100 points

    // Update Firebase database
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    playerInfoRef.update({
        "stage4pts": stage4pts,
        "stage4max": stage4max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1000;
    });

    displayResultStage4(correctCountStage4);
}

// Function to display result in modal for Stage 4
function displayResultStage4(correctCountStage4) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage4 === decimalNumbersStage4.length) {
        modalContent.textContent = `You got a perfect score! 1000 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage4} out of ${decimalNumbersStage4.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}


    
//=================================================================================================
//     STAGE 5
//=================================================================================================

const decimalQuestionsStage5 = [
    {
        question: 'Which of the following fractions is equivalent to 0.225?',
        options: ['9/40', '225/100', '25/111'],
        correctAnswer: '9/40'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.23?',
        options: ['7/40', '23/10', '23/100'],
        correctAnswer: '23/100'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.1842?',
        options: ['1842/1000', '921/5000', '184/10000'],
        correctAnswer: '921/5000'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.6543?',
        options: ['6534/10000', '645/1000', '6543/10000'],
        correctAnswer: '6543/10000'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.4?',
        options: ['4/5', '2/5', '1/4'],
        correctAnswer: '2/5'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.465?',
        options: ['93/200', '465/100', '4650/1000'],
        correctAnswer: '93/200'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.7?',
        options: ['1/7', '7/10', '7/9'],
        correctAnswer: '7/10'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.5731?',
        options: ['5713/10000', '5731/1000', '5731/10000'],
        correctAnswer: '5731/10000'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.123?',
        options: ['123/1000', '1230/1000', '123/100'],
        correctAnswer: '123/1000'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.36?',
        options: ['9/25', '36/1000', '18/50'],
        correctAnswer: '9/25'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.8462?',
        options: ['8462/1000', '4231/5000', '846/1000'],
        correctAnswer: '4231/5000'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.22?',
        options: ['22/1000', '22/50', '11/50'],
        correctAnswer: '11/50'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.3?',
        options: ['3/5', '1/3', '3/10'],
        correctAnswer: '3/10'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.336?',
        options: ['42/125', '336/10000', '36/125'],
        correctAnswer: '42/125'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.6428?',
        options: ['3142/5000', '1607/2500', '6284/10000'],
        correctAnswer: '1607/2500'
    }
];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate quiz questions for Stage 5
function generateQuizStage5() {
    const quizContainerStage5 = document.getElementById('quiz-container-stage5');

    decimalQuestionsStage5.forEach((questionData, index) => {
        const options = questionData.options.slice(); // Copy the options
        shuffleArray(options); // Shuffle the options

        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <p class="text-lg font-medium text-white">${index + 1}. ${questionData.question}</p>
            <select id="answerStage5${index}" class="border border-whitw text-white bg-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Fraction</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <span class="hidden" id="correctAnswerStage5${index}">${questionData.correctAnswer}</span>
        `;
        quizContainerStage5.appendChild(question);
    });
}

// Function to check answers for Stage 5
function checkAnswersStage5() {
    let correctCountStage5 = 0;
    let stage5pts = 0;
    let stage5max = 0;

    decimalQuestionsStage5.forEach((questionData, index) => {
        const userAnswer = document.getElementById(`answerStage5${index}`).value.trim();
        const correctAnswer = document.getElementById(`correctAnswerStage5${index}`).textContent.trim();

        // Compare user's answer with correct answer
        if (userAnswer === correctAnswer) {
            correctCountStage5++;
        }
    });

    // Calculate points and max for Stage 5
    stage5pts = correctCountStage5 * 100; // Assuming each correct answer gives 100 points
    stage5max = decimalQuestionsStage5.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage5pts": stage5pts,
        "stage5max": stage5max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1200;
    });

    displayResultStage5(correctCountStage5);
}

// Function to display result in modal for Stage 5
function displayResultStage5(correctCountStage5) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage5 === decimalQuestionsStage5.length) {
        modalContent.textContent = `You got a perfect score! 1200 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage5} out of ${decimalQuestionsStage5.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}


//=================================================================================================
//     STAGE 6
//=================================================================================================
 // Decimal numbers for Stage 6
 const decimalNumbersStage6 = ['0.(1111)', '0.(5555)', '0.(3333)', '0.(8888)', '0.(4444)'];

 // Correct answers for Stage 6
 const correctAnswersStage6 = ['1/9', '5/9', '1/3', '8/9', '4/9'];

 // Function to generate quiz questions for Stage 6
 function generateQuizStage6() {
     const quizContainerStage6 = document.getElementById('quiz-container-stage6');

     decimalNumbersStage6.forEach((decimal, index) => {
         const question = document.createElement('div');
         question.className = 'mb-4';
         question.innerHTML = `
             <label for="answerStage6${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal} = </label>
             <input type="text" id="answerStage6${index}" class="border border-white text-white bg-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
         `;
         quizContainerStage6.appendChild(question);
     });
 }

// Function to check answers for Stage 6
function checkAnswersStage6() {
    let correctCountStage6 = 0;
    let stage6pts = 0;
    let stage6max = 0;

    decimalNumbersStage6.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage6${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === correctAnswersStage6[index]) {
            correctCountStage6++;
        }
    });

    // Calculate points and max for Stage 6
    stage6pts = correctCountStage6 * 100; // Assuming each correct answer gives 100 points
    stage6max = decimalNumbersStage6.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage6pts": stage6pts,
        "stage6max": stage6max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1500;
    });

    displayResultStage6(correctCountStage6);
}

// Function to display result in modal for Stage 6
function displayResultStage6(correctCountStage6) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage6 === decimalNumbersStage6.length) {
        modalContent.textContent = `You got a perfect score! 1500 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage6} out of ${decimalNumbersStage6.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}

 //=================================================================================================
//     STAGE 7
//=================================================================================================

    // Decimal numbers for Stage 7
    const decimalNumbersStage7 = ['0.(262626)', '0.(010101)', '0.(757575)', '0.(030303)', '0.(696969)', '0.(131313)', '0.(393939)', '0.(515151)', '0.(424242)', '0.(848484)'];

    // Correct answers for Stage 7
    const correctAnswersStage7 = ['26/99', '1/99', '75/99', '1/33', '23/23', '13/99', '13/33', '51/99', '42/99', '84/99'];

    // Function to generate quiz questions for Stage 7
    function generateQuizStage7() {
        const quizContainerStage7 = document.getElementById('quiz-container-stage7');

        decimalNumbersStage7.forEach((decimal, index) => {
            const question = document.createElement('div');
            question.className = 'mb-4';
            question.innerHTML = `
                <label for="answerStage7${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal} = </label>
                <input type="text" id="answerStage7${index}" class="border border-white text-white bg-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
            `;
            quizContainerStage7.appendChild(question);
        });
    }

 // Function to check answers for Stage 7
function checkAnswersStage7() {
    let correctCountStage7 = 0;
    let stage7pts = 0;
    let stage7max = 0;

    decimalNumbersStage7.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage7${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === correctAnswersStage7[index]) {
            correctCountStage7++;
        }
    });

    // Calculate points and max for Stage 7
    stage7pts = correctCountStage7 * 100; // Assuming each correct answer gives 100 points
    stage7max = decimalNumbersStage7.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage7pts": stage7pts,
        "stage7max": stage7max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1600;
    });

    displayResultStage7(correctCountStage7);
}

// Function to display result in modal for Stage 7
function displayResultStage7(correctCountStage7) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage7 === decimalNumbersStage7.length) {
        modalContent.textContent = `You got a perfect score! 1600 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage7} out of ${decimalNumbersStage7.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}

//=================================================================================================
//     STAGE 8
//=================================================================================================
// Decimal numbers for Stage 8
const decimalNumbersStage8 = [
    '0.(252)',       // 0.(252)
    '0.(363)',       // 0.(363)
    '0.(657)',     // 0.(657) ̅
    '1.(222)',     // 1.(222) ̅
    '0.(544)',       // 0.(544)
    '3.(123)',       // 3.(123)
    '3.(333)',       // 3.(333)
    '1.(262)',     // 1.(262) ̅
    '0.(181)',       // 0.(181)
    '22.(333)',     // 22. (333)
    '0.(454)',      // 0. (454)
    '33.(333)',     // 33. (333)
    '0.(765)',      // 0. (765)
    '0.(666)',      // 0. (666)
    '0.(272)'       // 0. (272)
];

// Correct answers for Stage 8
const correctAnswersStage8 = [
    '28/111', '121/333', '73/111', '1 2/9', '544/999', '3 41/333', '3 1/3', '1 262/999', '181/999', '22 1/3', '454/999', '33 1/3', '85/111', '2/3', '272/999'
];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate quiz questions for Stage 8
function generateQuizStage8() {
    const quizContainerStage8 = document.getElementById('quiz-container-stage8');

    decimalNumbersStage8.forEach((decimal, index) => {
        const options = correctAnswersStage8.slice(); // Copy the correct answers
        const correctAnswer = options[index]; // Get the correct answer
        shuffleArray(options); // Shuffle the options

        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <label for="answerStage8${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal}</label>
            <select id="answerStage8${index}" class="border border-white bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Fraction</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <span class="hidden" id="correctAnswerStage8${index}">${correctAnswer}</span>
        `;
        quizContainerStage8.appendChild(question);
    });
}
// Function to check answers for Stage 8
function checkAnswersStage8() {
    let correctCountStage8 = 0;
    let stage8pts = 0;
    let stage8max = 0;

    decimalNumbersStage8.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage8${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === correctAnswersStage8[index]) {
            correctCountStage8++;
        }
    });

    // Calculate points and max for Stage 8
    stage8pts = correctCountStage8 * 100; // Assuming each correct answer gives 100 points
    stage8max = decimalNumbersStage8.length * 100; // Assuming each question is worth 100 points

    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage8pts": stage8pts,
        "stage8max": stage8max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1800;
    });

    displayResultStage8(correctCountStage8);
}

// Function to display result in modal for Stage 8
function displayResultStage8(correctCountStage8) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage8 === decimalNumbersStage8.length) {
        modalContent.textContent = `You got a perfect score! 1800 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage8} out of ${decimalNumbersStage8.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}


//=================================================================================================
//     STAGE 9
//=================================================================================================
// Decimal numbers for Stage 9
const decimalNumbersStage9 = [
    '0.(3699)',
    '0.(2893)',
    '0.(4781)',
    '1.(5763)',
    '0.(6711)',
    '0.(1233)',
    '2.(7416)',
    '0.(8124)',
    '1.(9993)',
    '0.(7524)',
    '1.(3645)',
    '2.(2145)',
    '0.(2457)',
    '0.(6534)',
    '0.(7832)'
];

// Corresponding correct answers for Stage 9
const correctAnswersStage9 = [
    '411/1111',
    '263/909',
    '4781/9999',
    '1 1921/3333',
    '2237/3333',
    '137/1111',
    '2 824/1111',
    '2708/3333',
    '1 3331/3333',
    '76/101',
    '1 405/1111',
    '2 65/303',
    '273/1111',
    '66/101',
    '712/909'
];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate quiz questions for Stage 9
function generateQuizStage9() {
    const quizContainerStage9 = document.getElementById('quiz-container-stage9');

    decimalNumbersStage9.forEach((decimal, index) => {
        const options = correctAnswersStage9.slice(); // Copy the correct answers
        const correctAnswer = options[index]; // Get the correct answer
        shuffleArray(options); // Shuffle the options

        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <label for="answerStage9${index}" class="text-lg font-medium text-white">${index + 1}. ${decimal}</label>
            <select id="answerStage9${index}" class="border border-white bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Fraction</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <span class="hidden" id="correctAnswerStage9${index}">${correctAnswer}</span>
        `;
        quizContainerStage9.appendChild(question);
    });
}
// Function to check answers for Stage 9
function checkAnswersStage9() {
    let correctCountStage9 = 0;
    let stage9pts = 0;
    let stage9max = 0;

    decimalNumbersStage9.forEach((decimal, index) => {
        const userAnswer = document.getElementById(`answerStage9${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === correctAnswersStage9[index]) {
            correctCountStage9++;
        }
    });

    // Calculate points and max for Stage 9
    stage9pts = correctCountStage9 * 100; // Assuming each correct answer gives 100 points
    stage9max = decimalNumbersStage9.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage9pts": stage9pts,
        "stage9max": stage9max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 1900;
    });

    displayResultStage9(correctCountStage9);
}

// Function to display result in modal for Stage 9
function displayResultStage9(correctCountStage9) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage9 === decimalNumbersStage9.length) {
        modalContent.textContent = `You got a perfect score! 1900 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage9} out of ${decimalNumbersStage9.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}

//=================================================================================================
//     STAGE 10
//=================================================================================================

// Decimal numbers for Stage 10
const decimalQuestionsStage10 = [
    {
        question: 'Which of the following fractions is equivalent to 1.(63) ̅?',
        options: ['1 7/11', '1 63/100', '1 63/90', '1 7/10'],
        correctAnswer: '1 7/11'
    },
    {
        question: 'Which of the following fractions is equivalent to 7.(85) ̅?',
        options: ['7 85/100', '7 17/20', '7 85/99', '7 85/90'],
        correctAnswer: '7 85/99'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.3 ̅?',
        options: ['1 3/10', '1 2/3', '1/3', '1 1/3'],
        correctAnswer: '1 1/3'
    },
    {
        question: 'Which of the following fractions is equivalent to 3.(84) ̅?',
        options: ['3 84/100', '3 21/25', '3 28/33', '3 84/90'],
        correctAnswer: '3 28/33'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.3(72) ̅?',
        options: ['1 24/330', '1 124/333', '1 372/999', '1 41/110'],
        correctAnswer: '1 41/110'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.28(57) ̅?',
        options: ['1 943/3300', '1 2857/10000', '1 2819/3300', '1 2857/9999'],
        correctAnswer: '1 943/3300'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.6 ̅?',
        options: ['1 3/5', '1 2/3', '1 3/2', '1 5/3'],
        correctAnswer: '1 3/2'
    },
    {
        question: 'Which of the following fractions is equivalent to 8.(29) ̅?',
        options: ['8 29/1000', '8 29/90', '8 29/99', '8 29/100'],
        correctAnswer: '8 29/99'
    },
    {
        question: 'Which of the following fractions is equivalent to 5.(682) ̅?',
        options: ['5 682/1000', '5 682/999', '5 341/500', '5 682/990'],
        correctAnswer: '5 682/999'
    },
    {
        question: 'Which of the following fractions is equivalent to 2.7 ̅?',
        options: ['2 7/10', '2 1/7', '2 3/4', '2 7/9'],
        correctAnswer: '2 7/9'
    },
    {
        question: 'Which of the following fractions is equivalent to 3.4(235) ̅?',
        options: ['3 4321/9990', '3 4235/10000', '3 847/2000', '3 447/990'],
        correctAnswer: '3 4321/9990'
    },
    {
        question: 'Which of the following fractions is equivalent to 5.256 ̅?',
        options: ['5 77/300', '5 32/125', '5 256/990', '5 154/330'],
        correctAnswer: '5 256/990'
    },
    {
        question: 'Which of the following fractions is equivalent to 6.4 ̅?',
        options: ['6 2/5', '6 4/9', '6 4/90', '6 4/5'],
        correctAnswer: '6 4/9'
    },
    {
        question: 'Which of the following fractions is equivalent to 9.072 ̅?',
        options: ['9 72/1000', '9 72/990', '9 13/180', '9 9/125'],
        correctAnswer: '9 13/180'
    },
    {
        question: 'Which of the following fractions is equivalent to 36.(7456) ̅?',
        options: ['36 7456/10000', '36 3728/5000', '36 1864/9990', '36 7456/9999'],
        correctAnswer: '36 7456/9999'
    },
];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate quiz questions for Stage 10
function generateQuizStage10() {
    const quizContainerStage10 = document.getElementById('quiz-container-stage10');

    decimalQuestionsStage10.forEach((questionData, index) => {
        const options = questionData.options.slice(); // Copy the options
        shuffleArray(options); // Shuffle the options

        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <p class="text-lg font-medium text-white">${index + 1}. ${questionData.question}</p>
            <select id="answerStage10${index}" class="border border-white text-white bg-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Fraction</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <span class="hidden" id="correctAnswerStage10${index}">${questionData.correctAnswer}</span>
        `;
        quizContainerStage10.appendChild(question);
    });
}

// Function to check answers for Stage 10
function checkAnswersStage10() {
    let correctCountStage10 = 0;
    let stage10pts = 0;
    let stage10max = 0;

    decimalQuestionsStage10.forEach((questionData, index) => {
        const userAnswer = document.getElementById(`answerStage10${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === questionData.correctAnswer) {
            correctCountStage10++;
        }
    });

    // Calculate points and max for Stage 10
    stage10pts = correctCountStage10 * 100; // Assuming each correct answer gives 100 points
    stage10max = decimalQuestionsStage10.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stage10pts": stage10pts,
        "stage10max": stage10max,
    });

    // Add 500 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 2000;
    });

    displayResultStage10(correctCountStage10);
}

// Function to display result in modal for Stage 10
function displayResultStage10(correctCountStage10) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountStage10 === decimalQuestionsStage10.length) {
        modalContent.textContent = `You got a perfect score! 2000 coins added to your account.`;
    } else {
        // Generate a random reward between 100 and 200 coins
        const randomReward = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountStage10} out of ${decimalQuestionsStage10.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}


//=================================================================================================
//     QUIZ
//=================================================================================================
// Decimal numbers for the final stage
const decimalQuestionsFinalStage = [
    {
        question: 'Which of the following fractions is equivalent to 1.4?',
        options: ['2/5', '4/10', '1 2/10', '14/10'],
        correctAnswer: '2/5'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.7?',
        options: ['7 1/10', '7/100', '7/10', '1/7'],
        correctAnswer: '7/10'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.35?',
        options: ['35/1000', '7/20', '35/10', '5/7'],
        correctAnswer: '7/20'
    },
    {
        question: 'Which of the following fractions is equivalent to 3.56?',
        options: ['356/1000', '3 24/25', '56/100', '3 14/25'],
        correctAnswer: '3 14/25'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.255?',
        options: ['255/10000', '51/200', '53/200', '2 55/200'],
        correctAnswer: '51/200'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.644?',
        options: ['1 161/250', '1644/10000', '644/1000', '1 160/250'],
        correctAnswer: '161/250'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.8744?',
        options: ['8744/1000', '1134/1350', '1093/1250', '1 744/1000'],
        correctAnswer: '1093/1250'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.1235?',
        options: ['1235/2000', '1235/1000', '123/1000', '247/2000'],
        correctAnswer: '247/2000'
    },
    {
        question: 'Which of the following fractions is equivalent to 5.5?',
        options: ['5 5/100', '55/100', '5 1/2', '1/2'],
        correctAnswer: '5 1/2'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.44?',
        options: ['24/50', '4/100', '44/1000', '11/25'],
        correctAnswer: '11/25'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.7 ̅?',
        options: ['1 7/9', '1 7/10', '7/9', '7/10'],
        correctAnswer: '1 7/9'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.6 ̅?',
        options: ['3/5', '2/3', '6/10', '6/100'],
        correctAnswer: '2/3'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.(42) ̅?',
        options: ['21/50', '42/99', '14/33', '42/100'],
        correctAnswer: '14/33'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.(12) ̅?',
        options: ['1 12/100', '14/33', '12/99', '1 3/25'],
        correctAnswer: '1 3/25'
    },
    {
        question: 'Which of the following fractions is equivalent to 2.(264) ̅?',
        options: ['2 264/1000', '264/999', '2 33/125', '2 88/333'],
        correctAnswer: '2 88/333'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.(939) ̅?',
        options: ['313/333', '939/1000', '939/10000', '313/500'],
        correctAnswer: '313/333'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.(324) ̅?',
        options: ['12/37', '324/1000', '81/250', '27/40'],
        correctAnswer: '12/37'
    },
    {
        question: 'Which of the following fractions is equivalent to 1.(3639) ̅?',
        options: ['1 3639/10000', '1 1213/3333', '1 1819/5000', '1 1213/9999'],
        correctAnswer: '1 3639/10000'
    },
    {
        question: 'Which of the following fractions is equivalent to 4.(24) ̅?',
        options: ['4 24/100', '4 6/25', '4 8/33', '4 12/50'],
        correctAnswer: '4 8/33'
    },
    {
        question: 'Which of the following fractions is equivalent to 0.(2643) ̅?',
        options: ['2643/10000', '1321/5000', '440/3333', '881/3333'],
        correctAnswer: '881/3333'
    }
    // ... (continue with the rest of the questions)
];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate quiz questions for the final stage
function generateQuizFinalStage() {
    const quizContainerFinalStage = document.getElementById('quiz-container-final');

    decimalQuestionsFinalStage.forEach((questionData, index) => {
        const options = questionData.options.slice(); // Copy the options
        shuffleArray(options); // Shuffle the options

        const question = document.createElement('div');
        question.className = 'mb-4';
        question.innerHTML = `
            <p class="text-lg font-medium text-white">${index + 1}. ${questionData.question}</p>
            <select id="answerFinalStage${index}" class="border border-white text-white bg-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Fraction</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <span class="hidden" id="correctAnswerFinalStage${index}">${questionData.correctAnswer}</span>
        `;
        quizContainerFinalStage.appendChild(question);
    });
}

// Function to check answers for the final stage
function checkAnswersFinalStage() {
    let correctCountFinalStage = 0;
    let finalStagePts = 0;
    let finalStageMax = 0;

    decimalQuestionsFinalStage.forEach((questionData, index) => {
        const userAnswer = document.getElementById(`answerFinalStage${index}`).value.trim();
        
        // Compare user's answer with correct answer
        if (userAnswer === questionData.correctAnswer) {
            correctCountFinalStage++;
        }
    });

    // Calculate points and max for the final stage
    finalStagePts = correctCountFinalStage * 100; // Assuming each correct answer gives 100 points
    finalStageMax = decimalQuestionsFinalStage.length * 100; // Assuming each question is worth 100 points
    const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
    // Update Firebase database
    playerInfoRef.update({
        "stagefinalpts": finalStagePts,
        "stagefinalmax": finalStageMax,
    });

    // Add 1000 coins to the existing amount
    playerInfoRef.child("coin").transaction(function(currentCoin) {
        return (currentCoin || 0) + 5000;
    });

    displayResultFinalStage(correctCountFinalStage);
}

// Function to display result in modal for the final stage
function displayResultFinalStage(correctCountFinalStage) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Check if the user got a perfect score
    if (correctCountFinalStage === decimalQuestionsFinalStage.length) {
        modalContent.textContent = `Congratulations! You got a perfect score in final stage! 5000 coins added to your account.`;
    } else {
        // Generate a random reward between 200 and 300 coins
        const randomReward = Math.floor(Math.random() * (300 - 200 + 1) + 200);
        // Add the random reward to the existing amount
        const playerInfoRef = firebase.database().ref(`player_info/${usernameplayer}`);
        playerInfoRef.child("coin").transaction(function(currentCoin) {
            return (currentCoin || 0) + randomReward;
        });

        modalContent.textContent = `You got ${correctCountFinalStage} out of ${decimalQuestionsFinalStage.length} correct. You received a reward of ${randomReward} coins!`;
    }

    modal.classList.remove('hidden');
}



//=================================================================================================
//     END
//=================================================================================================

    // Function to close the modal
    function closeModal() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        const modal = document.getElementById('modal');
        modal.classList.add('hidden');
        const url = `../stage.html?username=${username}`;

        // Navigate to the constructed URL
        window.location.href = url;
    }

    // Generate the quiz for Stage 2 when the page loads
    window.onload = () => {
        generateQuiz();
        generateQuizStage2();
        generateQuizStage3();
        generateQuizStage4();
        generateQuizStage5();
        generateQuizStage6();
        generateQuizStage7();
        generateQuizStage8();
        generateQuizStage9();
        generateQuizStage10();
        generateQuizFinalStage();
    };

