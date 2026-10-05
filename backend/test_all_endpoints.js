const BASE_URL = 'http://localhost:5000/api';

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function testEndpoints() {
  const results = [];
  
  const addResult = (module, passed, details) => {
    results.push({ module, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${module}: ${details}`);
  };

  try {
    // 1. Home Slider
    let res = await fetchJson(`${BASE_URL}/home-slider`);
    addResult('Home Slider (Public)', res.success === true, `Fetched ${res.data.length} active slides`);
    
    // 2. Department Settings
    res = await fetchJson(`${BASE_URL}/website-settings`);
    addResult('Website Settings', res.success === true, `Fetched settings, keys: ${Object.keys(res.data).join(', ')}`);

    // 3. Faculty
    res = await fetchJson(`${BASE_URL}/faculty`);
    addResult('Faculty', res.success === true, `Fetched ${res.data.length} faculty`);

    // 4. Events
    res = await fetchJson(`${BASE_URL}/events`);
    addResult('Events', res.success === true, `Fetched ${res.data.length} events`);

    // 5. Announcements
    res = await fetchJson(`${BASE_URL}/announcements`);
    addResult('Announcements', res.success === true, `Fetched ${res.data.length} announcements`);

    // 6. Achievements
    res = await fetchJson(`${BASE_URL}/achievements`);
    addResult('Achievements', res.success === true, `Fetched ${res.data.length} achievements`);

    // 7. Placements
    res = await fetchJson(`${BASE_URL}/placements/students`);
    addResult('Placements (Students)', res.success === true, `Fetched ${res.data.length} students`);
    


    // 8. Projects
    res = await fetchJson(`${BASE_URL}/projects`);
    addResult('Projects', res.success === true, `Fetched ${res.data.length} projects`);

    // 9. Research
    res = await fetchJson(`${BASE_URL}/research`);
    addResult('Research', res.success === true, `Fetched ${res.data.length} research papers`);

    // 10. Gallery
    res = await fetchJson(`${BASE_URL}/gallery/albums`);
    addResult('Gallery (Albums)', res.success === true, `Fetched ${res.data.length} albums`);

    // 11. Alumni
    res = await fetchJson(`${BASE_URL}/alumni`);
    addResult('Alumni', res.success === true, `Fetched ${res.data.length} alumni`);

    // 12. Downloads
    res = await fetchJson(`${BASE_URL}/downloads`);
    addResult('Downloads', res.success === true, `Fetched ${res.data.length} downloads`);

    // Print summary
    const passed = results.filter(r => r.passed).length;
    console.log(`\n--- SUMMARY ---`);
    console.log(`Total: ${results.length}, Passed: ${passed}, Failed: ${results.length - passed}`);
    
  } catch (error) {
    console.error('Test failed during execution:', error.message);
  }
}

testEndpoints();
