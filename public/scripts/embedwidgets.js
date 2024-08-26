(function() {
    const scriptTag = document.currentScript;
    const spaceId = scriptTag.getAttribute('data-space-id');
  
    const container = document.createElement('div');
    container.id = 'feedback-widget';
    document.body.appendChild(container);
  
    fetch(`https://testimonials-abhyuday.vercel.app/api/get-feedbacks?spaceId=${spaceId}`)
      .then(response => response.json())
      .then(data => {
        const feedbacks = data.feedbacks;
        feedbacks.forEach(feedback => {
          const feedbackElement = document.createElement('div');
          feedbackElement.className = 'feedback-item';
          feedbackElement.innerHTML = `
            <p><strong>${feedback.name}</strong></p>
            <p>${feedback.comment}</p>
            <p>Rating: ${feedback.rating}</p>
            <p>${new Date(feedback.createdAt).toLocaleDateString()}</p>
            <hr/>
          `;
          container.appendChild(feedbackElement);
        });
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  })();
  