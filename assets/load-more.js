  const grid = document.getElementById("product-grid");
  const trigger = document.getElementById("scroll-trigger");

  if (!grid || !trigger) return;

  let loading = false;

  const loadMore = async () => {
    if (loading) return;

    const link = trigger.querySelector("a");
    if (!link) return;

    loading = true;

    try {
      const res = await fetch(link.href);
      const text = await res.text();
      const html = new DOMParser().parseFromString(text, "text/html");

      const items = html.querySelectorAll("#product-grid .grid__item");
      items.forEach(item => grid.appendChild(item));

      const newTrigger = html.querySelector("#scroll-trigger");

      if (newTrigger) {
        trigger.innerHTML = newTrigger.innerHTML;
      } else {
        trigger.remove();
        window.removeEventListener("scroll", handleScroll);
      }

    } catch (err) {
      console.error(err);
    }

    loading = false;
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight - 300;

    if (scrollPosition >= bottom) {
      loadMore();
    }
  };

  window.addEventListener("scroll", handleScroll);
