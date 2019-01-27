console.log('vkrae');

fetch('./.netlify/functions/test')
  .then(response => {
    if (response.status !== 200) {
      console.log('status code:', response.status);
      return;
    }

    return response.json().then(data => {
      console.log('data', data);

      document.querySelector('#value').textContent = data.value;
    });
  })