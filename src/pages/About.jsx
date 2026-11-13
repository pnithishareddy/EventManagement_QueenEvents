export default function About({ go }) {
  return (
    <section className="section narrow about">
      <h1 className="page-title">About Us</h1>
      <div className="about-row">
        <div>
          <h3 className="script">Our philosophy</h3>
          <p>Queen Events is an event logistics and marketing company formed in 2013. We offer A-Z event planning with experienced planners, suppliers and venues, and we do not charge fees to our clients.</p>
          <h3 className="script">The Team</h3>
          <p>Our profit comes from strong supplier relationships, so you pay no fee, pay your supplier less and have a professional team handling every loose end.</p>
        </div>
        <img src="/images/about1.jpg" alt="Our team" />
      </div>
      <h3 className="script">How can we help?</h3>
      <ul className="help-list">
        <li><b>A-Z planning.</b> We work on your event from start to finish.</li>
        <li><b>Venue consultancy.</b> Hundreds of venues to match your event.</li>
        <li><b>We organise</b> birthdays, weddings, concerts, seminars, galas and team events.</li>
        <li><b>We give you more:</b> photography, catering, sound and lighting, decor and RSVP follow-up.</li>
      </ul>
      <button className="btn-q primary lg" onClick={() => go('events')}>See upcoming events</button>
    </section>
  );
}
