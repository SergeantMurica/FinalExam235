// Get all products
const products = document.querySelectorAll(".product-section");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const resetBtn = document.getElementById("resetBtn");
const resultsCount = document.getElementById("count");
const noResults = document.getElementById("noResults");
const productsGrid = document.getElementById("productsGrid");

// Filter and display products
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;

  let visibleCount = 0;
  let productsArray = Array.from(products);

  // Filter products
  productsArray.forEach((product) => {
    const productName = product.getAttribute("data-name").toLowerCase();
    const productCategory = product.getAttribute("data-category");
    const productPrice = parseFloat(product.getAttribute("data-price"));

    // Check search term
    const matchesSearch = productName.includes(searchTerm);

    // Check category
    const matchesCategory =
      selectedCategory === "all" || productCategory === selectedCategory;

    // Check price range
    let matchesPrice = true;
    if (selectedPrice !== "all") {
      const [min, max] = selectedPrice.split("-").map(Number);
      if (max) {
        matchesPrice = productPrice >= min && productPrice <= max;
      } else {
        matchesPrice = productPrice >= min;
      }
    }

    // Show or hide product
    if (matchesSearch && matchesCategory && matchesPrice) {
      product.style.display = "block";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  // Update results count
  resultsCount.textContent = visibleCount;

  // Show/hide no results message
  if (visibleCount === 0) {
    noResults.style.display = "block";
    productsGrid.style.display = "none";
  } else {
    noResults.style.display = "none";
    productsGrid.style.display = "grid";
  }

  // Apply sorting
  sortProducts();
}

// Sort products
function sortProducts() {
  const sortValue = sortFilter.value;
  let productsArray = Array.from(products);

  if (sortValue === "price-low") {
    productsArray.sort(
      (a, b) =>
        parseFloat(a.getAttribute("data-price")) -
        parseFloat(b.getAttribute("data-price"))
    );
  } else if (sortValue === "price-high") {
    productsArray.sort(
      (a, b) =>
        parseFloat(b.getAttribute("data-price")) -
        parseFloat(a.getAttribute("data-price"))
    );
  } else if (sortValue === "name-asc") {
    productsArray.sort((a, b) =>
      a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"))
    );
  } else if (sortValue === "name-desc") {
    productsArray.sort((a, b) =>
      b.getAttribute("data-name").localeCompare(a.getAttribute("data-name"))
    );
  }

  // Reorder in DOM
  productsArray.forEach((product) => {
    productsGrid.appendChild(product);
  });
}

// Reset all filters
function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  priceFilter.value = "all";
  sortFilter.value = "default";
  filterProducts();
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
searchBtn.addEventListener("click", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
sortFilter.addEventListener("change", filterProducts);
resetBtn.addEventListener("click", resetFilters);

// Search on Enter key
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    filterProducts();
  }
});

// Check for URL parameters on page load
window.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const search = urlParams.get("search");

  if (category) {
    categoryFilter.value = category;
    filterProducts();
  }

  if (search) {
    searchInput.value = search;
    filterProducts();
  }
});
