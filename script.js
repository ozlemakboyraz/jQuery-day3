$(document).ready(function () {
  function fetchUsers(count = 10) {
    $.ajax({
      url: `https://randomuser.me/api/?results=${count}`,
      dataType: 'json',
      success: function (data) {
       
        $('.user-cards-container').empty();
        const firstFive = data.results.slice(0, 5);
        firstFive.forEach(user => {
          const card = $(`
            <div class="user-card animate__animated animate__fadeInUp">
              <img src="${user.picture.large}" alt="${user.name.first}" />
              <h3>${user.name.first} ${user.name.last}</h3>
              <p>${user.email}</p>
              <p>${user.location.country}</p>
              <button class="more-button">More</button>
            </div>
          `);

          
          card.find('.more-button').on('click', function () {
            Fancybox.show([
              {
                src: `
                  <div style="max-width:400px; text-align:left;">
                    <h2 style="text-align:center;">Details</h2>
                    <p><strong>Address:</strong> ${user.location.street.name} ${user.location.street.number}, ${user.location.city}</p>
                    <p><strong>Country:</strong> ${user.location.country}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Registration Date:</strong> ${new Date(user.registered.date).toLocaleDateString()}</p>
                  </div>
                `,
                type: "html"
              }
            ]);
          });

          $('.user-cards-container').append(card);
        });

        
        if ($('.basic-slider').hasClass('slick-initialized')) {
          $('.basic-slider').slick('unslick');
        }
        $('.basic-slider').empty();

        data.results.forEach(user => {
          const slide = $(`
            <div class="slide-user">
              <img src="${user.picture.thumbnail}" />
              <p>${user.name.first} ${user.name.last}</p>
            </div>
          `);
          $('.basic-slider').append(slide);
        });

        $('.basic-slider').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 5,
          slidesToScroll: 1,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } }
          ]
        });
      }
    });
  }

 
  fetchUsers();

  $('#refresh-btn').on('click', function () {
    fetchUsers();
  });
});
