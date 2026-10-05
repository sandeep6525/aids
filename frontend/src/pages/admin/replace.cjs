const fs = require('fs');
const path = './RecruitersManager.jsx';

let content = fs.readFileSync(path, 'utf8');

// Replacements
content = content.replace(/AlumniManager/g, 'RecruitersManager');
content = content.replace(/alumni/g, 'recruiters');
content = content.replace(/Alumni/g, 'Recruiter');
content = content.replace(/profile_photo_url/g, 'logo_url');
content = content.replace(/graduation_year/g, 'industry');
content = content.replace(/programme/g, 'website_url');
content = content.replace(/company/g, 'company_name');
content = content.replace(/designation/g, 'display_order'); // Wait, display order is int
content = content.replace(/location/g, 'description');
content = content.replace(/linkedin_url/g, 'featured');

// Fix some specific lines
content = content.replace(/formData\.industry/g, 'formData.industry');

fs.writeFileSync(path, content);
console.log('Replaced');
