// Fetch the JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const activityCardsContainer = document.getElementById('activity-cards');
    const timeframeButtons = document.querySelectorAll('.timeframe-btn');
    let currentTimeframe = 'weekly'; // Default timeframe

    // Function to create activity cards
    function createActivityCards(timeframe) {
      activityCardsContainer.innerHTML = ''; // Clear existing cards
      data.forEach(activity => {
        const card = document.createElement('div');
        card.className = `activity-card ${activity.title.toLowerCase().replace(' ', '-')}`;
        card.innerHTML = `
          <div class="card-header">
            <img src="./images/icon-${activity.title.toLowerCase().replace(' ', '-')}.svg" alt="${activity.title}">
          </div>
          <div class="card-content">
            <div class="card-title">
              <h2>${activity.title}</h2>
              <span class="ellipsis">...</span>
            </div>
            <p class="hours">${activity.timeframes[timeframe].current}hrs</p>
            <p class="previous">Last ${timeframe === 'daily' ? 'Day' : timeframe === 'weekly' ? 'Week' : 'Month'} - ${activity.timeframes[timeframe].previous}hrs</p>
          </div>
        `;
        activityCardsContainer.appendChild(card);
      });
    }

    // Initial card creation
    createActivityCards(currentTimeframe);

    // Event listeners for timeframe buttons
    timeframeButtons.forEach(button => {
      button.addEventListener('click', () => {
        timeframeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentTimeframe = button.dataset.timeframe;
        createActivityCards(currentTimeframe);
      });
    });

    // Set 'weekly' as default active button
    document.querySelector('[data-timeframe="weekly"]').classList.add('active');
  })
  .catch(error => console.error('Error fetching data:', error));