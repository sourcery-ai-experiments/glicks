<template>

</template>

<script>
    // Example login function
async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    console.error(data.error);
  }
}

// Example function to update categories
async function updateCategories(newCategories) {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/updateCategories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(newCategories),
  });

  const data = await response.json();
  if (response.ok) {
    console.log(data.message);
  } else {
    console.error(data.error);
  }
}

</script>