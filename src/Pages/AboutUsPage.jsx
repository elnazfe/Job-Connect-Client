import React from 'react';
import { Typography, Box, Divider, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function AboutUsPage() {
  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto'}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Kanit',
          /* margin: '0 10%', */
        }}
      >
        <Typography variant="h3" component="h3" sx={{ mt: 6, mb: 3 }}>
          About Us
        </Typography>
        <img src="/icon (13).svg" alt="Image" style={{ width: '400px', borderRadius: '10px' }} />
      </Box>
      <article>
        
        <Typography variant="body1" paragraph>
          We, a team of two junior developers, created this application as a job tracker to help individuals manage their job applications and update application statuses. As we progressed, we realized the value of extending the platform to recruiters. Now, users can not only track their applications but also discover new opportunities posted by recruiters. Our aim is to bridge the gap between job seekers and recruiters, simplifying the job search process and providing recruiters with an efficient platform. Thank you for joining us on this journey of continuous improvement to meet the needs of both job seekers and recruiters.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for being a part of our journey as we continue to enhance and improve the application to meet the needs of both job seekers and recruiters.
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Who are we?
        </Typography>
        <Typography variant="body1" paragraph>
          Two junior developers, who want to stay on track with their job applications when embarking on a new journey.
        </Typography>
        <Typography variant="body1" paragraph>
          <span role="img" aria-label="Female Technologist">
            👩🏼‍💻
          </span>
          <span role="img" aria-label="Female Technologist">
            👩🏻‍💻
          </span>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Box sx={{ width: '45%', textAlign: 'center' }}>
            <img src="/12.svg" alt="Ana Rak" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }} />
            <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 1 }}>
              Ana Rak
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Full Stack Developer with a background in Google Ads, customer support, and hospitality.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <a href="https://github.com/ana-rak/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                <GitHubIcon fontSize="large" />
              </a>
              <a href="https://linkedin.com/in/ana-rak/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <LinkedInIcon fontSize="large" />
              </a>
            </Box>
          </Box>
          <Box sx={{ width: '45%', textAlign: 'center' }}>
            <img src="/13.svg" alt="Elnaz Farrokhi" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }} />
            <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 1 }}>
              Elnaz Farrokhi
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Full Stack Developer with a background in Social Media Managing.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <a href="https://github.com/elnazfe/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                <GitHubIcon fontSize="large" />
              </a>
              <a href="https://linkedin.com/in/elnaz-farrokhi/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <LinkedInIcon fontSize="large" />
              </a>
            </Box>
          </Box>
        </Box>
      </article>
    </Box>
  );
}

export default AboutUsPage;
