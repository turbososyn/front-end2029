const VARIANT = 6;

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fio = document.getElementById("fio");
  const birth = document.getElementById("birth");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const telegram = document.getElementById("telegram");

  fio.value = fio.value.trim();
  birth.value = birth.value.trim();
  address.value = address.value.trim();
  email.value = email.value.trim();
  telegram.value = telegram.value.trim();

  const regex = {
    fio: /^[А-ЯІЇЄ][а-яіїє]+ [А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/,
    birth: /^\d{2}\.\d{2}\.\d{4}$/,
    address: /^м\. [А-ЯІЇЄа-яіїє]+(?:[ -][А-ЯІЇЄа-яіїє]+)*$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    telegram: /^@[A-Za-z0-9_]{5,32}$/
  };

  let isValid = true;

  function validate(input, pattern) {
    if (!pattern.test(input.value)) {
      input.classList.add("error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  }

  validate(fio, regex.fio);
  validate(birth, regex.birth);
  validate(address, regex.address);
  validate(email, regex.email);
  validate(telegram, regex.telegram);

  if (isValid) {
    const win = window.open("", "", "width=400,height=300");
    win.document.write(`
      <h3>Введені дані</h3>
      <p>ПІБ: ${fio.value}</p>
      <p>Дата народження: ${birth.value}</p>
      <p>Адреса: ${address.value}</p>
      <p>Email: ${email.value}</p>
      <p>Telegram: ${telegram.value}</p>
    `);
  }
});

const table = document.getElementById("grid");
const picker = document.getElementById("colorPicker");

let number = 1;

for (let i = 0; i < 6; i++) {
  const row = document.createElement("tr");

  for (let j = 0; j < 6; j++) {
    const cell = document.createElement("td");
    cell.textContent = number;

    if (number === VARIANT) {
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = `rgb(${rand()}, ${rand()}, ${rand()})`;
      });

      cell.addEventListener("click", () => {
        cell.style.backgroundColor = picker.value;
      });

      cell.addEventListener("dblclick", () => {
        for (let r = i; r < 6; r++) {
          for (let c = j; c < 6; c++) {
            table.rows[r].cells[c].style.backgroundColor = picker.value;
          }
        }
      });
    }

    row.appendChild(cell);
    number++;
  }

  table.appendChild(row);
}

function rand() {
  return Math.floor(Math.random() * 256);
}
