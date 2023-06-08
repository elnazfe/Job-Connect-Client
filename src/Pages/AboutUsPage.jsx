import React from 'react';

function AboutUsPage() {
  return (
    <div>
      
      <article className="about-us">
      <h3>About Us</h3>
        <p id="about-us">
        We, a team of two junior developers, created this application as a job tracker to help individuals manage their job applications and update application statuses. As we progressed, we realized the value of extending the platform to recruiters. Now, users can not only track their applications but also discover new opportunities posted by recruiters. Our aim is to bridge the gap between job seekers and recruiters, simplifying the job search process and providing recruiters with an efficient platform. Thank you for joining us on this journey of continuous improvement to meet the needs of both job seekers and recruiters.< br/>
          Thank you for being a part of our journey as we continue to enhance and improve the application to meet the needs of both job seekers and recruiters.
        </p>
        <hr />
        <h1 className="aboutH1">Who are we?</h1>
        <p id="aboutP2">
          Two junior developers, who want to stay on track with their job applications when embarking on a new journey.
          <br />
          👩🏼‍💻 👩🏻‍💻
        </p>

        <div className="profiles">
          <div className="ind-profile">
            <header>
              <img src="/ww.png" alt="pic" className="us-image" />
              <h2>Ana Rak</h2>
              <p id="aboutMeP">Full Stack Developer with a background in Google Ads, customer support, and hospitality.</p>
              <div className="profile-buttons">
              <a href="https://github.com/ana-rak/" >
    <img src="github.svg" alt="Github" style={{ width: '35px', height: '35px' }}/>
  </a>
  <a href="https://linkedin.com/in/ana-rak/" >
    <img src="linkedin-original.svg" alt="Linkedin" style={{ width: '35px', height: '35px' }}/>
  </a>
              </div>
            </header>
          </div>
          <div className="ind-profile">
            <header>
              <img src="/ww.png" alt="pic" className="us-image" />
              <h2>Elnaz Farrokhi</h2>
              <p id="aboutMeP2">
                Full Stack Developer with a background in Social Media Managing.
              </p>
              <div className="profile-buttons">
              <a href="https://github.com/elnazfe/" >
    <img src="github.svg" alt="Github" style={{ width: '35px', height: '35px' }}/>
  </a>
  <a href="https://linkedin.com/in/elnaz-farrokhi/" >
    <img src="linkedin-original.svg" alt="Linkedin" style={{ width: '35px', height: '35px' }}/>
  </a>
              </div>
            </header>
          </div>
        </div>
      </article>
    </div>
  );
}

export default AboutUsPage;
