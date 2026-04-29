let api = "http://localhost:3000/api/notes";

let btn = document.getElementById("addnotes");

let card = document.getElementById("card");

let titleInput = document.getElementById("title");
let contentInput = document.getElementById("content");

btn.addEventListener("click", async () => {
  let title = titleInput.value;
  let content = contentInput.value;
  try {
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
  } catch (err) {
    console.log(err);
  }
});

async function renderTask() {
  let res = await fetch(api);
  let notes = await res.json();

  notes.forEach((note) => {
    card.innerHTML += `
       
    <div class="col-md-3">

        
     <div class="card text-white bg-primary h-100">

            <div class="card-body d-flex flex-column">

              <!-- Top Content -->
              <div>
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text ">
                ${note.content}
                </p>
              </div>

              <!-- Bottom Date -->
              <p class="mt-auto small">
                <i class="fa-regular fa-clock me-1"></i>
                <span class="date-time"></span>
              </p>

            </div>

          </div>
          </div>
    `;
  });
}

renderTask();
