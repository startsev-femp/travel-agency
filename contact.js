document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("contactName").value
    const email = document.getElementById("contactEmail").value
    const phone = document.getElementById("contactPhone").value
    const message = document.getElementById("contactMessage").value

    alert(
      `Дякуємо за повідомлення, ${name}!\n\nМи отримали ваш запит і зв'яжемося з вами найближчим часом на email: ${email}`,
    )

    contactForm.reset()
  })
})
