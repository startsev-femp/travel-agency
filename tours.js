// Дані про тури
const tours = [
  {
    id: 1,
    name: "Париж - місто кохання",
    country: "Франція",
    duration: "7 днів / 6 ночей",
    price: 25000,
    image: "/paris-eiffel-tower.png",
    description: "Незабутня подорож до столиці Франції з відвідуванням Ейфелевої вежі, Лувру та Нотр-Дам.",
    features: ["Авіаперельоти", "Готель 4*", "Сніданки включені", "Екскурсії з гідом"],
  },
  {
    id: 2,
    name: "Рим - вічне місто",
    country: "Італія",
    duration: "6 днів / 5 ночей",
    price: 22000,
    image: "/rome-colosseum.png",
    description: "Відкрийте для себе стародавню історію Риму, відвідайте Колізей, Ватикан та фонтан Треві.",
    features: ["Авіаперельоти", "Готель 3*", "Сніданки", "Трансфери"],
  },
  {
    id: 3,
    name: "Барселона - гауді та море",
    country: "Іспанія",
    duration: "5 днів / 4 ночі",
    price: 20000,
    image: "/barcelona-sagrada-familia.png",
    description: "Насолодіться архітектурою Гауді, пляжами Барселони та каталонською кухнею.",
    features: ["Авіаперельоти", "Готель 4*", "Сніданки", "Екскурсія по місту"],
  },
  {
    id: 4,
    name: "Прага - казкове місто",
    country: "Чехія",
    duration: "5 днів / 4 ночі",
    price: 15000,
    image: "/prague-castle-bridge.jpg",
    description: "Романтична Прага з її середньовічними вуличками, замками та чеським пивом.",
    features: ["Автобусний тур", "Готель 3*", "Сніданки", "Дегустація пива"],
  },
  {
    id: 5,
    name: "Стамбул - схід зустрічається з заходом",
    country: "Туреччина",
    duration: "6 днів / 5 ночей",
    price: 18000,
    image: "/istanbul-blue-mosque.png",
    description: "Унікальне місто на двох континентах з багатою історією та смачною кухнею.",
    features: ["Авіаперельоти", "Готель 4*", "Сніданки та вечері", "Круїз по Босфору"],
  },
  {
    id: 6,
    name: "Амстердам - місто каналів",
    country: "Нідерланди",
    duration: "4 дні / 3 ночі",
    price: 19000,
    image: "/amsterdam-canals-bicycles.jpg",
    description: "Відкрийте для себе Амстердам з його каналами, музеями та тюльпанами.",
    features: ["Авіаперельоти", "Готель 3*", "Сніданки", "Прогулянка на човні"],
  },
]

let selectedTour = null

// Відображення турів на сторінці
function displayTours() {
  const container = document.getElementById("toursContainer")

  tours.forEach((tour) => {
    const tourCard = document.createElement("div")
    tourCard.className = "tour-card"
    tourCard.innerHTML = `
            <img src="${tour.image}" alt="${tour.name}" class="tour-image">
            <div class="tour-content">
                <h3>${tour.name}</h3>
                <div class="tour-duration">📅 ${tour.duration}</div>
                <p>${tour.description}</p>
                <div class="tour-features">
                    <ul>
                        ${tour.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                <div class="tour-footer">
                    <div>
                        <span class="price-label">Від</span>
                        <div class="tour-price">${tour.price.toLocaleString()} грн</div>
                    </div>
                    <button class="btn btn-primary" onclick="openBookingModal(${tour.id})">Забронювати</button>
                </div>
            </div>
        `
    container.appendChild(tourCard)
  })
}

// Відкриття модального вікна
function openBookingModal(tourId) {
  selectedTour = tours.find((tour) => tour.id === tourId)
  const modal = document.getElementById("bookingModal")
  document.getElementById("tourName").value = selectedTour.name
  document.getElementById("modalTitle").textContent = `Бронювання: ${selectedTour.name}`

  // Встановлюємо мінімальну дату (сьогодні)
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("startDate").min = today

  modal.style.display = "block"
  calculatePrice()
}

// Закриття модального вікна
const modal = document.getElementById("bookingModal")
const closeBtn = document.querySelector(".close")

closeBtn.onclick = () => {
  modal.style.display = "none"
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// Розрахунок вартості
function calculatePrice() {
  if (!selectedTour) return

  const adults = Number.parseInt(document.getElementById("adults").value) || 0
  const children = Number.parseInt(document.getElementById("children").value) || 0

  // Дітям знижка 50%
  const childPrice = selectedTour.price * 0.5
  const totalPrice = adults * selectedTour.price + children * childPrice

  document.getElementById("totalPrice").textContent = totalPrice.toLocaleString()
  document.getElementById("priceDetails").textContent =
    `Дорослих: ${adults} × ${selectedTour.price.toLocaleString()} грн + Дітей: ${children} × ${childPrice.toLocaleString()} грн`
}

// Обробка зміни кількості осіб
document.addEventListener("DOMContentLoaded", () => {
  displayTours()

  const adultsInput = document.getElementById("adults")
  const childrenInput = document.getElementById("children")

  if (adultsInput) {
    adultsInput.addEventListener("input", calculatePrice)
  }
  if (childrenInput) {
    childrenInput.addEventListener("input", calculatePrice)
  }

  // Обробка форми бронювання
  const bookingForm = document.getElementById("bookingForm")
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        tour: document.getElementById("tourName").value,
        startDate: document.getElementById("startDate").value,
        adults: document.getElementById("adults").value,
        children: document.getElementById("children").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        totalPrice: document.getElementById("totalPrice").textContent,
      }

      alert(
        `Дякуємо за бронювання, ${formData.name}!\n\nТур: ${formData.tour}\nДата: ${formData.startDate}\nДорослих: ${formData.adults}, Дітей: ${formData.children}\nЗагальна вартість: ${formData.totalPrice} грн\n\nМи зв'яжемося з вами найближчим часом!`,
      )

      modal.style.display = "none"
      bookingForm.reset()
    })
  }
})
