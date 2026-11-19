
const opportunities = [
  {
    id: 1,
    title: "Software Development Internship",
    company: "Example Tech",
    category: "Internship",
    deadline: "2026-12-15",
    description: "An illustrative entry-level software internship."
  },
  {
    id: 2,
    title: "Women in Technology Scholarship",
    company: "Example Foundation",
    category: "Scholarship",
    deadline: "2026-12-20",
    description: "An illustrative scholarship opportunity."
  },
  {
    id: 3,
    title: "National Innovation Challenge",
    company: "Example Innovation Group",
    category: "Competition",
    deadline: "2027-01-10",
    description: "An illustrative student innovation competition."
  },
  {
    id: 4,
    title: "Data Analytics Internship",
    company: "Example Analytics",
    category: "Internship",
    deadline: "2027-01-15",
    description: "An illustrative data analytics internship."
  },
  {
    id: 5,
    title: "Student Research Grant",
    company: "Example Research Trust",
    category: "Scholarship",
    deadline: "2027-02-01",
    description: "An illustrative student research grant."
  }
];

// These records are demo examples, not live opportunities.
let saved = JSON.parse(localStorage.getItem("campusSaved") || "[]");
let applied = JSON.parse(localStorage.getItem("campusApplied") || "[]");

const list = document.getElementById("opportunityList");

function saveState() {
  localStorage.setItem("campusSaved", JSON.stringify(saved));
  localStorage.setItem("campusApplied", JSON.stringify(applied));
}

function render() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filtered = opportunities.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.company.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesStatus =
      status === "All" ||
      (status === "Saved" && saved.includes(item.id)) ||
      (status === "Applied" && applied.includes(item.id));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  list.innerHTML = "";

  document.getElementById("totalCount").textContent = opportunities.length;
  document.getElementById("savedCount").textContent = saved.length;
  document.getElementById("appliedCount").textContent = applied.length;

  if (filtered.length === 0) {
    list.textContent = "No matching opportunities found.";
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    const categoryText = document.createElement("div");
    categoryText.className = "category";
    categoryText.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const company = document.createElement("p");
    company.textContent = item.company;

    const description = document.createElement("p");
    description.textContent = item.description;

    const deadline = document.createElement("p");
    deadline.textContent = "Demo deadline: " + item.deadline;

    const saveButton = document.createElement("button");
    saveButton.className = "secondary";
    saveButton.textContent = saved.includes(item.id) ? "Unsave" : "Save";
    saveButton.addEventListener("click", () => toggleSaved(item.id));

    const applyButton = document.createElement("button");
    applyButton.textContent = applied.includes(item.id) ? "Applied" : "Mark Applied";
    applyButton.disabled = applied.includes(item.id);
    applyButton.addEventListener("click", () => markApplied(item.id));

    card.append(categoryText, title, company, description,
      deadline, saveButton, applyButton);
    list.appendChild(card);
  });
}

function toggleSaved(id) {
  saved = saved.includes(id)
    ? saved.filter(item => item !== id)
    : [...saved, id];

  saveState();
  render();
}

function markApplied(id) {
  if (!applied.includes(id)) {
    applied.push(id);
    saveState();
    render();
  }
}

["searchInput", "categoryFilter", "statusFilter"].forEach(id => {
  document.getElementById(id).addEventListener("input", render);
});

render();
