export default function Projects() {
  return (
    <section className="projects">
      <h2 className="title">Our Projects</h2>
      <div className="carousel">

        {/* DESKTOP CAROUSEL */}
        <div className="carousel-wrapper desktop-carousel">
          <div className="carousel">
            <button className="arrow left">&#10094;</button>
            <div className="slides-wrapper">
              <div className="slides">
                <img src="https://picsum.photos/400/200?5" className="slide clone" />
                <img src="https://picsum.photos/400/200?1" className="slide" />
                <img src="https://picsum.photos/400/200?2" className="slide" />
                <img src="https://picsum.photos/400/200?3" className="slide" />
                <img src="https://picsum.photos/400/200?4" className="slide" />
                <img src="https://picsum.photos/400/200?5" className="slide" />
                <img src="https://picsum.photos/400/200?1" className="slide clone" />
              </div>
            </div>
            <button className="arrow right">&#10095;</button>
          </div>
          <div className="dots desktop-dots"></div>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="carousel-wrapper mobile-carousel">
          <div className="carousel">
            <button className="arrow left">&#10094;</button>
            <div className="slides-wrapper">
              <div className="slides">
                <img src="https://picsum.photos/200/400?5" className="slide clone" />
                <img src="https://picsum.photos/200/400?1" className="slide" />
                <img src="https://picsum.photos/200/400?2" className="slide" />
                <img src="https://picsum.photos/200/400?3" className="slide" />
                <img src="https://picsum.photos/200/400?4" className="slide" />
                <img src="https://picsum.photos/200/400?5" className="slide" />
                <img src="https://picsum.photos/200/400?1" className="slide clone" />
              </div>
            </div>
            <button className="arrow right">&#10095;</button>
          </div>
          <div className="dots mobile-dots"></div>
        </div>

      </div>
    </section>
  );
}
